module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '' }

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou déjà pris"

    if (err.message.includes('email'))
        errors.email = "Email incorrect ou déjà pris"

    return errors
}