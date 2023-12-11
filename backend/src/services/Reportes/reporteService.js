import sql from 'mssql'
import config from '../../../db.js'
import 'dotenv/config'
import { ComputadoraService } from './computadoraService.js'
import { UserService } from '../userService.js'



const compuService = new ComputadoraService()
const userService = new UserService()
const pTabla = process.env.DB_TABLA_REPORTE;

export class ReporteService {

    GetReporte = async (reporte) => {

        
        
        let objetoFallo = reporte.objetoFallo
        let estado = reporte.estado
        let compu = reporte.compu

        let where = " "

        let filtros = [];
        if (objetoFallo) {
            filtros.push(`ObjetoFallo = '${objetoFallo}'`)
        }
        if (estado) {
            filtros.push(`Estado = '${estado}'`);
        }
        if (compu) {
            filtros.push(`FK_Computadora = '${compu}'`);
        }
        if (filtros.length > 0) {
            where = ' WHERE ' + filtros.join(' AND ');
            console.log(where)
        }

        const pool = await sql.connect(config);
        const response = await pool.request()
            .query(`SELECT * from ${pTabla + where}`);
        
        var res = response.recordset

        return res;
    }

    GetReporteById = async (id) => {

        

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * from ${pTabla} where id = @id`);
        
        return response.recordset[0];
    }




    UpdateReporte = async (id, reporte) => {

        
        var estado = ""
        var R = await this.GetReporteById(id);
        console.log('reporte.FechaAbierto')
        console.log(reporte.FechaAbierto)
        console.log('R.FechaAbierto')
        console.log(R.FechaAbierto)
        
            if (reporte.Estado == "Abierto") {
                console.log('Abierto')
                estado = "Abierto"
            }
            else if (reporte.Estado == "Resuelto") {
                console.log('Resuelto')
                estado = "Resuelto"
            }

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .input('Estado', sql.NChar, estado)
            .input('FechaAbierto', sql.Date, reporte?.FechaAbierto ?? R.FechaAbierto)
            .input('FechaTerminado', sql.Date, reporte?.FechaTerminado ?? R.FechaTerminado)

            .query(`UPDATE ${pTabla} SET Estado = @Estado, FechaAbierto = @FechaAbierto, FechaTerminado = @FechaTerminado  WHERE id = @Id`);
        

        return response.recordset;
    }

    DeleteReporte = async (id) => {
        

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id)
            .query(`DELETE FROM ${pTabla} WHERE id = @id`);
        

        return response.recordset;
    }

    AddReporte = async (reporte) => {
        const error = "Algun Atributo no fue enviado correctamente"


        if (!reporte.FK_Computadora || !reporte.FK_Usuario || !reporte.ObjetoFallo) {
            return error
        }

        const timeElapsed = Date.now();
        const fecha = new Date(timeElapsed);
        fecha.toISOString()

        var compu = { Funciona: false }
        await compuService.UpdateComputadora(reporte.FK_Computadora, compu)

        const pool = await sql.connect(config)
        const response = await pool.request()
            .input('Estado', sql.NChar, "Pendiente")
            .input('FechaReportado', sql.Date, fecha)
            .input('FechaAbierto', sql.Date, null)
            .input('FechaTerminado', sql.Date, null)
            .input('Fk_Computadora', sql.Int, reporte.FK_Computadora)
            .input('Fk_Usuario', sql.Int, reporte.FK_Usuario)
            .input('ObjetoFallo', sql.NChar, reporte.ObjetoFallo)
            .input('Descripcion', sql.NChar, reporte.Descripcion)

            .query(`INSERT INTO ${pTabla} (Estado , Fk_Computadora , FK_Usuario , FechaTerminado , FechaAbierto , FechaReportado, ObjetoFallo, Descripcion) values (@Estado, @Fk_Computadora ,@FK_Usuario, @FechaTerminado, @FechaAbierto, @FechaReportado, @ObjetoFallo, @Descripcion)`);
        return response.recordset;
    }
}