import sql from 'mssql'
import config from '../../../db.js'
import 'dotenv/config'

const oTabla = process.env.DB_TABLA_OBJETO;

export class ObjetoService {

    GetObjeto = async (req) => {
        const { Categoria, EnPrestamo, Nombre, Activo } = req;
        let where = '';
        let filtros = [];
    
        if (Categoria) {
            filtros.push(`Fk_Categoria = ${Categoria}`);
        }
        if (EnPrestamo !== undefined) {
            filtros.push(`EnPrestamo = ${EnPrestamo ? 1 : 0}`);
        }
        if (Nombre) {
            filtros.push(`Nombre LIKE '${Nombre}%'`);
        }
        if (Activo !== undefined) {
            filtros.push(`Activo = ${Activo ? 1 : 0}`);
        }
    
        if (filtros.length > 0) {
            where = ' WHERE ' + filtros.join(' AND ');
            console.log(where);
        }
    
        try {
            const pool = await sql.connect(config);
            const response = await pool.request().query(`SELECT * from ${oTabla + where}`);
            return response.recordset;
        } catch (error) {
            console.error('Error en la consulta:', error);
            throw error; // Manejar el error adecuadamente según tus necesidades
        }
    };

    GetObjetoById = async (id) => {


        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * from ${oTabla} where id = @id`);

        return response.recordset[0];
    }

    UpdateObjeto = async (id, objeto) => {
        
        let activo = true
        let estado

        if (objeto.Activo == false) {
            activo = false
            estado = "No Usable"
            objeto.enPrestamo = 0
        }
        else if (objeto.EnPrestamo == 1) {
            estado = "Prestado"
        }
        else {
            estado = "Disponible"
        }


        var O = await this.GetObjetoById(id);

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Id', sql.Int, id)
            .input('Nombre', sql.NChar, objeto?.Nombre ?? O.Nombre)
            .input('Estado', sql.NChar, estado)
            .input('EnPrestamo', sql.Bit, objeto?.EnPrestamo ?? O.EnPrestamo)
            .input('Activo', sql.Bit, activo)

            .query(`UPDATE ${oTabla} SET Nombre = @Nombre, Estado = @Estado, EnPrestamo = @EnPrestamo, Activo = @Activo  WHERE id = @Id`);


        return response.recordset;
    }

    /*DeleteObjeto = async (id) => {
        

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`UPDATE ${oTabla} SET Activo = 0  WHERE id = @Id`);


        return response.recordset;
    }*/

    AddObjeto = async (objeto) => {
        var error = "Algun Atributo no fue enviado"
        if (!objeto.Estado || !objeto.Nombre || !objeto.EnPrestamo || !objeto.FK_Categoria) {
            return error
        }

        const pool = await sql.connect(config)
        const response = await pool.request()
            .input('Nombre', sql.NChar, objeto.Nombre)
            .input('Estado', sql.NChar, objeto.Estado)
            .input('EnPrestamo', sql.Bit, objeto.EnPrestamo)
            .input('Fk_Categoria', sql.Int, objeto.FK_Categoria)
            .input('Activo', sql.Bit, true)


            .query(`INSERT INTO ${oTabla} (Nombre , Estado , EnPrestamo , FK_Categoria, Activo) values (@Nombre, @Estado, @EnPrestamo, @FK_Categoria, @Activo)`);
        return response.recordset;
    }
}
