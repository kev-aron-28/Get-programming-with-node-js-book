module.exports ={
    subscribe : (req, res) => {
        res.render("contact");
    },

    postedSignUp : (req, res) => {
        res.render("thanks");
    },

    showHome: (req, res) => {
        res.render("index");
    },

    chat: (req, res) => {
        res.render("chat")
    }
    

}

