export const getMinutesBalanceAPI = (socket, data) => {
    return new Promise((fulfill, reject) => {
        socket.emit('getMinutesBalance', data, (error, response) => {
            if (error) {
                console.log(`Error in closeChat ${error}`)
                reject({})
            } else {
                console.log(`Response on minutes left: ${response.minutes}`)

                let newBudget = (60 * response.minutes)
                let nbMinutes = Math.floor(newBudget / 60)
                let nbSeconds = Math.round(newBudget - nbMinutes * 60)

                fulfill({
                        minutes: parseFloat(nbMinutes.toFixed(0)),
                        seconds: parseFloat(nbSeconds.toFixed(0))

                    }
                )

            }
        })
    })

}
