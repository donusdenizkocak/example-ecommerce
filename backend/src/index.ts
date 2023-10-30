import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import { Product } from "./entity/Product"
var cors = require('cors');

AppDataSource.initialize().then(async () => {
// fork test işlemi test işlemi -- ikinci test işlemi
    // create express app
    //deniz
    const app = express()
    app.use(bodyParser.json())
    app.use(cors({
        credentials: true,
      }));

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3040)

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            email: "abc@xyz.com",
            password: "1234",
            phone: "05001112233",
            firstName: "Timber",
            lastName: "Saw"
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            email: "def@xyz.com",
            password: "1234",
            phone: "05001112244",
            firstName: "Phantom",
            lastName: "Assassin"
        })
    )

    const urn =  [1,2,3,4,5,6,7,8,9,10]
    for(let item of urn){
        await AppDataSource.manager.save(
            AppDataSource.manager.create(Product, {
                id: item,
                title: "Ürün " + item,
                seo: "urun-" + item,
                price: 100,
                discountPrice: 90,
                is_delete: false
            })
        )
    }

    console.log("Express server has started on port 3040. Open http://localhost:3040/users to see results")

}).catch(error => console.log(error))
