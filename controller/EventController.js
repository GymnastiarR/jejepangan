import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createEvent = async (req, res) => {
    const {id : userId, name, description, questions, heldOn, formRegister} = req.body;
    const {title, description : descriptionForm} = formRegister || {};
    try {
        const {id : eventId, ...event} = await prisma.event.create({
            data : {
                name, description, userId, heldOn : new Date(heldOn)
            }
        })

        if(title) {
            const {id : formRegisterId} = await prisma.formRegister.create({
                data : {eventId, title, description : descriptionForm}
            })

            for (const {content : question} of questions){
                const test = await prisma.questionRegister.create({
                    data : {question, formRegisterId}
                })
            }
        }

        res.status(200).json({message : "Berhasil Membuat Event",  data : event})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

export const getEventQuery = async (req, res) => {
    cleanQuery(req.query);
    try {
        const events = await prisma.event.findMany({
            where : req.query,
            select : {
                name : true,
                description : true,
                heldOn : true,
                user : {
                    select : {
                        name : true,
                        username : true
                    }
                }
            }
        })
        res.status(200).json({message : "Success", data : events})
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export const getDetailEvent = async (req, res) => {
    cleanQuery(req.query)
    try {
        const {id} = req.query;
        const event = await prisma.event.findFirst({
            where : {id},
            select : {
                name : true,
                description : true,
                user : {
                    select : {
                        name : true,
                        username : true
                    }
                },
                formRegister : {
                    select : {
                        title : true,
                        description : true,
                        questionRegister : true
                    }
                }
            }
        })
        res.status(200).json({message : "Success", data : event})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

// export const answerRegister = async (req, res) => {
//     const id = 
//     try {
//         for (question of req.body){
//             await prisma.answerRegister.create({
//                 data : {
//                     formRegisterId : question.id,
//                     userId : 
//                     content : question.content
//                 }
//             })
//         }
//     } catch (error) {
        
//     }
// }

export const delEvent = async (req, res) => {
    const {id : userId, eventId} = req.body;
    try {

        const {userId : eventUserId} = await prisma.event.findFirst({
            where : {
                id : eventId
            }
        })

        if(!(userId == eventUserId)) throw new Error("Tidak Memiliki Akses Untuk Melakukan Aksi")

        const {id : formRegisterId} = await prisma.formRegister.findFirst({
            where : {
                eventId
            }
        })

        if(formRegisterId){
            await prisma.questionRegister.deleteMany({
                where : {
                    formRegisterId
                }
            })

            await prisma.formRegister.deleteMany({
                where : {
                    eventId
                }
            })
        }

        await prisma.event.delete({
            where : {id : eventId}
        })

        res.status(200).json({message : "Delete Success"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}
export const updateEvent = async (req, res) => {
    const {id, eventId, name, description, heldOn, formRegister, questions} = req.body
    try {

        await prisma.event.update({
            where : {
                id : eventId
            },
            data : {
                name, description, heldOn : new Date(heldOn)
            }
        })

        if(!formRegister) res.status(200).json({message : "Berhasil Update"}).end();

        const {id : formRegisterId, title, description : formRegisterDesc} = formRegister;
        console.log(title);

        if(formRegisterId){
            await prisma.event.update({
                where : {
                    id : eventId
                },
                data : {
                    formRegister : {
                        update : {
                            title,
                            description : formRegisterDesc
                        }
                    }
                }
            })
        }else{
            await prisma.formRegister.create({
                data : {
                    title, 
                    description : formRegisterDesc, 
                    eventId,
                }
            })
        }

        for(const question of questions){
            const {id : questionId, content} = question;
            if(questionId) {
                await prisma.formRegister.update({
                    where : {
                        id : formRegisterId
                    },
                    data : {
                        questionRegister : {
                            update : {
                                where : {
                                    id : questionId
                                },
                                data : {
                                    question : content
                                }
                            }
                        }
                    }
                })
            }else{
                await prisma.questionRegister.create({
                    data : {
                        formRegisterId, content
                    }
                })
            }
        }
        res.status(200).json({message : "Update Berhasil"})
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

function cleanQuery(query){
    for ( let [key, value] of Object.entries(query)){
        if(!isNaN(value)){
            query[key] = parseInt(value)
        }

        if(key == 'heldOn'){
            query[key] = new Date(query[key])
        }
    }
}
