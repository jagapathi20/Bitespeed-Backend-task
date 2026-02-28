import { Request, Response } from "express";
import { Contact } from "../entities/contact";
import { AppDataSource } from "../data-source";
import { In } from "typeorm";
import { formatResponse } from "../utilites/utilities.response";

export const identityController = async(req: Request, res: Response) => {
    try{
        const contactRepository = AppDataSource.getRepository(Contact)
        const {phoneNumber, email} = req.body

        const existingContacts = await contactRepository.find({
            where: [
                {email: email || undefined},
                {PhoneNumber: phoneNumber?.toString() || undefined}
            ]
        })

        if (existingContacts.length === 0){
            const newContact = contactRepository.create({
                email,
                PhoneNumber: phoneNumber.toString(),
                linkPrecedence: 'primary'
            })
            await contactRepository.save(newContact)

            return res.status(200).json(formatResponse(newContact, []))
        }

        const primaryIds = new Set<number>();

        existingContacts.forEach(element => {
            primaryIds.add(element.linkPrecedence === "primary" ? element.id : element.linkedId!)
        });

        let primaryContacts = await contactRepository.find({
            where: {id: In(Array.from(primaryIds))},
            order: {createdAt: "ASC"}
        })

        const mainPrimary = primaryContacts[0]

        if (!mainPrimary) {
            return res.status(500).json({ error: "Primary contact not found" });
        }

        if(primaryContacts.length > 1 && mainPrimary){
            const secondaryPrimaries = primaryContacts.slice(1)
            for(const contact of secondaryPrimaries){
                contact.linkPrecedence = "secondary",
                contact.linkedId = mainPrimary.id
                await contactRepository.save(contact)

                await contactRepository.update(
                    {linkedId: contact.id},
                    {linkedId: mainPrimary.id}
                )
            }
        }

        const emailExists = existingContacts.some(c => c.email === email)
        const phoneExists = existingContacts.some(c => c.PhoneNumber === phoneNumber)

        if(email && phoneNumber && (!emailExists || !phoneExists)){
            const newSecondary = contactRepository.create({
                email,
                PhoneNumber: phoneNumber.toString(),
                linkedId: mainPrimary ? mainPrimary.id : null,
                linkPrecedence: "secondary"
            })
            await contactRepository.save(newSecondary)
        }

        const allRelated = await contactRepository.find({
            where: [
                {id: mainPrimary.id},
                {linkedId: mainPrimary.id}
            ]
        })

        return res.status(200).json(formatResponse(mainPrimary, allRelated))

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}