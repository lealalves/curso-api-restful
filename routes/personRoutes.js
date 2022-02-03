const router = require('express').Router()
const Person = require('../models/Person')


// CREATE - criação de dados 
router.post('/', async (req, res) => {

    // {name: "Leal", salary: 5000, approved: false}
    const {name, salary, approved} = req.body
    
    
    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'})
        return
    }
    
    const person = {
        name,
        salary,
        approved
    }
    
    //create
    try {
        
        await Person.create(person)
    
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})
    
    } catch (error) {
        res.status(500).json({error: error})
    }
    
})

// READ - leitura de dados

router.get('/', async(req, res) =>{
    try {
        
        const people = await Person.find()

        res.status(200).json(people)


    } catch (error) {
        res.status(500).json({error: error})
    }
})
// passar o id pela url, : significa que a url vai ser sempre diferente(ids unicos por exemplo)
router.get('/:id', async(req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        
        // findOne para encontrar o resultado único
        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json({error: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})


// UPDATE - atualização de dados (PUT, PATCH) 

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        
        const updatePerson = await Person.updateOne({_id: id}, person)

        if(updatePerson.matchedCount === 0) {
            res.status(422).json({error: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }



})


// DELET - deletar dados

router.delete('/:id', async(req, res) =>{
    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(422).json({error: 'O usuário não foi encontrado!'})
        return
    }

    try {
        
        await Person.deleteOne({_id: id})

        res.status(200).json({message: "Usuário removido com sucesso!"})


    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router