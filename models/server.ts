import express, { Application } from "express";

// Routes
import homeRoute from '../routes/otome.routes';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        otome: '/api/v1/otome' // TMOHentai
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.middleware();
        this.routes();
    }

    middleware(): void {
        this.app.use( express.json() );
    }

    routes(): void {
        this.app.use( this.apiPaths.otome, homeRoute )
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log('Server running in port: ', this.port)
        })
    }

}

export default Server;