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
    const RoleSkill = z.string().trim()

    return RoleSkill
}

const createRole = () => {
    const Role = z.object({
        title: z.string().trim(),
        role_desc: z.string().trim(),
        required_skills: z.array(createRoleSkill()),
        comp_skills: z.array(createRoleSkill()),
        min_hours: z.number(),
        role_location: z.string().trim(),
        is_team_lead: z.boolean().default(false),
    })

    return Role
}


const createTeamAdmin = () => {
    const TeamAdmin = z.object({
        name: z.string().trim(),
        email: z.string().email().trim(),
        img: z.string().url().trim(),
        social_url: z.string().url().trim(), // social URL is refered to LinkedIn Url, but the user can add any valid url, unless there is a check for that.
    })

    return TeamAdmin
}

const createAppren = (data) => {
    const Apprenticeship = z.object({
        title: z.string().trim(),
        company_logo: z.string().url().trim(),
        company_desc: z.string().trim(),
        appren_desc: z.string().trim(),
        intro_vid: z.string().url().trim(),
        timeline: z.object({
            start_date: z.string(),
            end_date: z.string(),
        }),
        team_type: z.string().trim(),
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

        // TODO: no trim here
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

const validateId =(data) => {
    const Id = z.object({
        id: z.string().trim().min(1)
    })

    return Id.parse(data)
}

module.exports = {
    createAppren,
    updateAppren,
    validateId,
}

