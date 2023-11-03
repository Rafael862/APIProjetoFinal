const knex = require("../database/knex");

class MenuController{
    async create(request, response){
        const { title, description} = request.body;
        
        const [menu_id] = await knex("menu").insert({
            title,
            description
        });
         
        response.json();
    }

    async show(request, response){
        const {id} = request.params;
        const menu = await knex("menu").where({id}).first();
        

        return response.json({
            ...menu
        });
    }

    async delete(request, response){
        const {id} = request.params;
        await knex("menu").where({id}).delete();
        return response.json();
    }

    async index(request, response){
        const {title, user_id, tags} = request.query;
        let notes;
        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());
            notes = await knex("tags")
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id"
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("notes", "notes.id", "tags.note_id")
            .orderBy("notes.title")
            .whereIn("name", filterTags)
        } else {
            notes = await knex("notes")
            .where({user_id})
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }

        const userTags = await knex("tags").where({user_id});
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);
            return {
                ...note,
                tags: noteTags
            }
        });
        return response.json(notesWithTags);
    }
}
module.exports = MenuController;