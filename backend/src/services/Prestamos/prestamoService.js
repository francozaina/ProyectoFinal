import sql from 'mssql'
import config from '../../../db.js'
import 'dotenv/config'
import { ObjetoService } from './objetoService.js'
import { UserService } from '../userService.js'



const objetoService = new ObjetoService()
const userService = new UserService()
const pTabla = process.env.DB_TABLA_PRESTAMO;
const join = " INNER JOIN dbo.Usuario ON dbo.Prestamo.FK_Usuario = dbo.Usuario.Id INNER JOIN dbo.Objeto ON dbo.Prestamo.FK_Objeto = dbo.Objeto.Id" 

export class PrestamoService {

    GetPrestamo = async (prestamo) => {


        let dni = prestamo.dni
        let estado = prestamo.estado
        let objeto = prestamo.FK_Objeto

        let where = " "
        
        if (dni || estado || objeto) {
            where = ' WHERE ';


            if (prestamo.dni) {
                
                where += `Usuario.dni LIKE '${dni}%'`;

            }

            if (estado) {
                if (where !== ' WHERE ') {
                    where += ' AND ';
                }
                where += `Estado LIKE '${estado}%'`;
            }

            if (objeto) {
                if (where !== ' WHERE ') {
                    where += ' AND ';
                }
                where += `FK_Objeto = ${objeto}`;
            }



        }
        const consulta = "SELECT P.*, O.Nombre from dbo.Prestamo P, dbo.Objeto O where O.id  = P.FK_Objeto " 
        console.log(consulta);
        console.log("Where :" + where)
        const pool = await sql.connect(config);
        const response = await pool.request()
            /*.query(`SELECT Prestamo.*, Objeto.Nombre from Prestamo, Objeto ${ join + where}`);*/
            .query(consulta);

        var res = response.recordset
        /*
        for (const obj of res) {

            let id = obj.Id[0]
            obj.Id = id
            
            delete obj.Clave
            delete obj.Rol
            
           
        }
        */
        return res;
    }

    GetPrestamoById = async (id) => {

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * from ${pTabla + join } where dbo.Prestamo.Id = @id`);

            var res = response.recordset[0]
            
                let idPrestamo = res.Id[0]
                res.Id = idPrestamo
                delete res.Clave
                delete res.Rol
            
            return res;
        
        
    }

    UpdatePrestamo = async (id, prestamo) => {

        var estado = ""
        var P = await this.GetPrestamoById(id);
        
        if (prestamo.Estado == "Pendiente") {
            console.log('Pendiente')
            estado = "Pendiente"
        }
        else if (prestamo.Estado == "Aceptado" || prestamo.Estado == "Prestado") {
            console.log('Aceptado')
            estado = "Aceptado"
        }
        /*
        ObjetoId = prestamo.FK_Objeto
        console.log("ObjetoID", ObjetoId);
        */
        console.log("prestamo", prestamo );
        console.log("Estado:",estado)
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .input('Estado', sql.NChar, estado)
            .input('FechaAceptado', sql.Date, prestamo?.FechaAceptado ?? P.FechaAceptado)
            .input('FechaEntregado', sql.Date, prestamo?.FechaEntregado ?? P.FechaEntregado)
            .input('FechaDevuelto', sql.Date, prestamo?.FechaDevuelto ?? P.FechaDevuelto)
            .query(`UPDATE dbo.Prestamo SET Estado = @Estado, FechaAceptado = @FechaAceptado, FechaEntregado = @FechaEntregado, FechaDevuelto = @FechaDevuelto  WHERE id = @Id`);
            console.log("estadoooooooooo", estado);
            const response2 = await pool.request()
            .input('ObjetoId', sql.Int, id)
            .input('Estado', sql.NChar, estado)
            .query(`UPDATE dbo.Objeto SET Estado = @Estado WHERE id = @ObjetoId`);
            console.log("estado objeto", estado);
        var q = await this.GetPrestamoById(id);
        
        console.log(q)
        return response.recordset, response2.recordset;
    }

    DeletePrestamo = async (id) => {


        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`DELETE FROM ${pTabla} WHERE id = @id`);


        return response.recordset;
    }

    AddPrestamo = async (prestamo) => {
        const error = "Algun Atributo no fue enviado correctamente"
        const error01 = "El objeto no esta activo o se encuentra en un prestamo"
        console.log('### prestamoService AddPrestamo prestamo.FK_Objeto:')
        console.log(prestamo.FK_Objeto)
        let obj = await objetoService.GetObjetoById(prestamo.Fk_Objeto)
        console.log('### prestamoService AddPrestamo obj:')
        console.log(obj)
        if (!prestamo.Fk_Objeto) {
            return error
        }
        if (obj.Activo == false || obj.EnPrestamo == true) {
            console.log(obj.Id)
            return error01
        }

        const timeElapsed = Date.now();
        const fecha = new Date(timeElapsed);
        fecha.toISOString()
        var objeto = { EnPrestamo: true }
        await objetoService.UpdateObjeto(prestamo.Fk_Objeto, objeto)

        const pool = await sql.connect(config)
        const response = await pool.request()
            .input('Estado', sql.NChar, "Pendiente")
            .input('FechaSolicitud', sql.Date, fecha)
            .input('FechaAceptado', sql.Date, null)
            .input('FechaEntregado', sql.Date, null)
            .input('FechaDevuelto', sql.Date, null)
            .input('Fk_Admin', sql.Int, prestamo.Fk_Admin)
            .input('Fk_Objeto', sql.Int, prestamo.Fk_Objeto)
            .input('Fk_Usuario', sql.Int, prestamo.Fk_Usuario)

            .query(`INSERT INTO ${pTabla} (Estado , Fk_Objeto , FK_Usuario , FK_Admin , FechaSolicitud , FechaAceptado , FechaEntregado, FechaDevuelto) values (@Estado, @Fk_Objeto,@FK_Usuario, @FK_Admin,@FechaSolicitud, @FechaAceptado,@FechaEntregado, @FechaDevuelto)`);
        
            
            return response.recordset;
    }
}