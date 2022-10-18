/*
This contains the validation rules for the firebase database, instead of making firebase security rules.
TODO: 
    - define the optional and non-optional fields
    - define custom error messages
    - validate the dates
*/

const z = require("zod")
const message = require("../../helpers/message")

const createRoleSkill = () => {
    const RoleSkill = z.string()

    return RoleSkill
}

const createRole = () => {
    const Role = z.object({
        title: z.string(),
        role_desc: z.string(),
        required_skills: z.array(createRoleSkill()),
        comp_skills: z.array(createRoleSkill()),
        min_hours: z.number(),
        role_location: z.string(),
        is_team_lead: z.boolean().default(false),
    })

    return Role
}


const createTeamAdmin = () => {
    const TeamAdmin = z.object({
        name: z.string(),
        email: z.string().email(),
        img: z.string().url(),
        social_url: z.string().url(), // social URL is refered to LinkedIn Url, but the user can add any valid url, unless there is a check for that.
    })

    return TeamAdmin
}

const createAppren = (data) => {
    const Apprenticeship = z.object({
        title: z.string(),
        company_logo: z.string().url(),
        company_desc: z.string(),
        appren_desc: z.string(),
        intro_vid: z.string().url(),
        timeline: z.object({
            start_date: z.string(),
            end_date: z.string(),
        }),
        team_type: z.string(),
        team_roles: z.array(createRole()),
        team_admins: z.array(createTeamAdmin()),
    })

    return Apprenticeship.parse(data)
}

const updateAppren = (data) => {
    const Apprenticeship = z.object({
        title: z.string().optional(),
        company_logo: z.string().url().optional(),
        company_desc: z.string().optional(),
        appren_desc: z.string().optional(),
        intro_vid: z.string().url().optional(),

        timeline: z.object({
            start_date: z.string(),
            end_date: z.string(),
        }).optional(),

        team_type: z.string().optional(),
        team_roles: z.array(createRole()).optional(),
        team_admins: z.array(createTeamAdmin()).optional(),
    })

    return Apprenticeship.parse(data)
}

const readAppren =(data) => {
    const ID = z.object({
        id: z.string().nullable().optional()

    })
    
    return ID.parse(data)
}

const clearAppren =(data) => {
    const ID = z.object({
        id: z.string().min(2,{message: "You have to pass the document's ID"})

    })
    
    return ID.parse(data)
}

module.exports = {
   createAppren,
   updateAppren,
   readAppren,
   clearAppren
}

