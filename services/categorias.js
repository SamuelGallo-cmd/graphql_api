import { connection } from "./connection.js";

const categoriaTable = () => connection.table('categorias');

export async function getAllCategories() {
    const query = categoriaTable().select().orderBy('titulo', 'desc');
    return query;
}

export async function createCategory({ titulo, descripcion }) {
    const category = {
        titulo,
        descripcion,
        created_at: new Date().toISOString(),
    };
    const [addedCategory] = await categoriaTable().insert(category).returning('*');
    return addedCategory; 
}

export async function updateCategory({ id, titulo, descripcion }) {
    const category = await categoriaTable().first().where({ id });
    if (!category) {
        return null;
    }
    const updateFields = { titulo, descripcion };
    await categoriaTable().update(updateFields).where({ id });
    return { ...category, ...updateFields };
}

export async function deleteCategory(id) {
    const category = await categoriaTable().first().where({id});
    if (!category) {
        return null;
    }
    await categoriaTable().delete().where({id});
    return category;
}