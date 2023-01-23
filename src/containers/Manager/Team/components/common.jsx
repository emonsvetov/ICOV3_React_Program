export const makeFormData = (program, values) => {
    let teamData = {};
    // teamData["organization_id"] = program.organization_id;
    // teamData["program_id"] = program.id;
    let {
        photo,
        name,
        title,
        description,
        contact_phone,
        contact_email,
    } = values;

    teamData.photo = photo;
    teamData.name = name;
    teamData.title = title;
    teamData.description = description;
    teamData.contact_phone = contact_phone;
    teamData.contact_email = contact_email;
    return teamData
}