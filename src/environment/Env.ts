class Production {
    readonly projectName = 'Hotel Booking'
    readonly projectId = ''
    readonly port = Number(process.env.PORT) || 8080
    readonly isLocal = this.port !== 8081

    readonly mongoDBUrl = 'mongodb+srv://mala:E5NOCtWxwjTfNBFA@cluster0.bc8sqmk.mongodb.net/Hotel_Management?retryWrites=true&w=majority'

    readonly extenalPass = '8B9D3D89F7CB7799C446edwedCCA327'
    readonly domain = ''
    readonly domainUI = ''

    readonly jwtSecret = 'D7788C66BEB24dHGGAF898C854FFE'
    readonly isProduction = true
}

export const Env = new Production()