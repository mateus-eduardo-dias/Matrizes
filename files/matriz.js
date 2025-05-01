import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const dbgFile = path.join(__dirname, '..', 'debug.json')

import {matrix, det, random} from "mathjs"

export default class {
    #matriz
    #arrMatriz
    #strMatriz
    #icognita
    det

    constructor(ordem, tipo, flag) {
        const tMatriz = []
        for (let i = 0; i < ordem; i++) {
            tMatriz.push([])
            for (let j = 0; j < ordem; j++) {
                let elemento
                do {
                    elemento = Math.floor((Math.random() * 9) - 3)
                } while (elemento == 0 && flag == 'not-zero')

                tMatriz[i].push(elemento)
            }
        }

        this.#arrMatriz = tMatriz
        this.#matriz = matrix(tMatriz)
        if (tipo == undefined) {
            this.#updateRep()
            this.#updateDet()
        } else if (tipo == 'x') {
            this.#updateDet()
            const i = Math.floor(Math.random() * ordem)
            const j = Math.floor(Math.random() * ordem)
            this.#icognita = tMatriz[i][j]
            tMatriz[i][j] = 'x'
            this.#matriz = matrix(tMatriz)
            this.#arrMatriz = tMatriz
            this.#updateRep()
        }
    }
    #updateRep() {
        const vMatriz = this.#arrMatriz
        let sMatriz = "{\n"
        for (const linha of vMatriz) {
            for (const elemento of linha) {
                let espaco
                if (elemento < 0) {
                    espaco = "   "
                } else {
                    espaco = "    "
                }
                sMatriz += espaco + elemento
            }
            sMatriz += "\n"
        }
        sMatriz += "}"
        this.#strMatriz = sMatriz
    }
    #updateDet() {
        this.det = det(this.#matriz)
    }
    toString() {
        return this.#strMatriz
    }
    getMatriz() {
        return this.#arrMatriz
    }
    getX() {
        return this.#icognita
    }
    // funcao para determinante (substituida pela função nativa 'det' do mathJs [linha 67], nao tankei fazer a mao kkkkkkk)
    /*
    determinante() {
        const vMatriz = this.#arrMatriz
        if (this.#ordem == 2) {
            return ((vMatriz[0][0] * vMatriz[1][1]) - (vMatriz[0][1] * vMatriz[1][0]))
        } else if (this.#ordem == 3) {
            const vMatrizB = [
                [vMatriz[0][0], vMatriz[0][1], vMatriz[0][2], vMatriz[0][0], vMatriz[0][1]],
                [vMatriz[1][0], vMatriz[1][1], vMatriz[1][2], vMatriz[1][0], vMatriz[1][1]],
                [vMatriz[2][0], vMatriz[2][1], vMatriz[2][2], vMatriz[2][0], vMatriz[2][1]]
            ]

            const pDiagPrinA = vMatrizB[0][0] * vMatrizB[1][1] * vMatrizB[2][2]
            const pDiagPrinB = vMatrizB[0][1] * vMatrizB[1][2] * vMatrizB[2][3]
            const pDiagPrinC = vMatrizB[0][2] * vMatrizB[1][3] * vMatrizB[2][4]
            const pDiagPrincipal = pDiagPrinA + pDiagPrinB + pDiagPrinC

            const pDiagSecA = vMatrizB[0][2] * vMatrizB[1][1] * vMatrizB[2][0]
            const pDiagSecB = vMatrizB[0][3] * vMatrizB[1][2] * vMatrizB[2][1]
            const pDiagSecC = vMatrizB[0][4] * vMatrizB[1][3] * vMatrizB[2][2]
            const pDiagSecundaria = pDiagSecA + pDiagSecB + pDiagSecC

            // codigo pra debug (ative somente caso queira salvar os resultados em um arquivo)
            
            const toSave = {
                matrizB: vMatrizB,
                diagP: {
                    A: pDiagPrinA,
                    B: pDiagPrinB,
                    C: pDiagPrinC,
                    T: pDiagPrincipal
                },
                diagS: {
                    A: pDiagSecA,
                    B: pDiagSecB,
                    C: pDiagSecC,
                    T: pDiagSecundaria
                },
                det: pDiagPrincipal - pDiagSecundaria
            }
            

            return pDiagPrincipal - pDiagSecundaria
        }
        
    }
    */
}