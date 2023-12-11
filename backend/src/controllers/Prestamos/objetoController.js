import { Router } from 'express'
import { ObjetoService } from '../../services/Prestamos/objetoService.js'
import { Authenticate, Authorize } from '../../services/Auth/AuthService.js'

const router = Router()
const objetoService = new ObjetoService()

router.get('/:categoriaId', /*Authenticate,*/ async (req, res) => {
    const categoriaId = req.params.categoriaId;
    const objetos = await objetoService.GetObjeto({ Categoria: categoriaId });
    return res.status(200).json(objetos);
});

router.get('/:id', /*Authenticate,*/ async (req, res) => {
    console.log('Get by ID')
    const id = req.params.id
    const objeto = await objetoService.GetObjetoById(id)
    return res.status(200).json(objeto)
})

router.post('', /*Authenticate,*/ Authorize, async (req, res) => {
    console.log('Post')
    const objeto = await objetoService.AddObjeto(req.body)
    return res.status(200).json(objeto)
})

router.delete('/:id', /*Authenticate,*/ Authorize, async (req, res) => {
    console.log('Delete')
    const objeto = await objetoService.DeleteObjeto(req.params.id)
    return res.status(200).json(objeto)
})

router.put('/:id', /*Authenticate,*/ Authorize, async (req, res) => {
    console.log('Put')
    const objeto = objetoService.UpdateObjeto(req.params.id, req.body)
    return res.status(200).json(objeto)
})

export default router