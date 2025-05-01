import { intro, outro, select, log , text} from "@clack/prompts"
import MatrizManager from "./files/matriz.js"
import { det } from "mathjs"

console.log('Welcome')
console.log('Mateus Eduardo \u00A9 2025')
console.log('All rights reserved')

console.log('\n\n')


intro("Matrizes")
const tipo = await select({
    message: 'Escolha o que deseja realizar',
    options: [
        { value: 'd2', label: 'Calcular determinante de 2º grau' },
        { value: 'd3', label: 'Calcular determinante de 3º grau' },
        { value: 'd2e', label: 'Calcular X em matriz de 2º grau' },
        { value: 'd3e', label: 'Calcular X em matriz de 2º grau' },
    ],
    initialValue: 'd2'
})

if (tipo == 'd2') {
    const matriz = new MatrizManager(2)
    const rep = matriz.toString()
    log.success('Matriz gerada')
    log.info(rep)
    const determinante = matriz.det
    await text({
        message: "Pressione qualquer tecla para exibir o valor da determinante"
    })
    log.info(`O valor da determinante é ${determinante}`)
}
else if (tipo == 'd3') {
    const matriz = new MatrizManager(3)
    const rep = matriz.toString()
    log.success('Matriz gerada')
    log.info(rep)
    const determinante = matriz.det
    await text({
        message: "Pressione qualquer tecla para exibir o valor da determinante"
    })
    log.info(`O valor da determinante é ${determinante}`)
}
else if (tipo == 'd2e') {
    const matriz = new MatrizManager(2, 'x')
    const rep = matriz.toString()
    log.success('Matriz gerada')
    log.info(rep)
    const determinante = matriz.det
    log.info(`Resultado = ${determinante}`)
    
    let status = false
    let tentativas = 0
    
    do {
        const x = await text({
            message: "Qual o valor de x?"
        })
        if (Number(x) == matriz.getX()) {
            log.success('Correto')
            status = true
        } else {
            tentativas ++
            if (tentativas != 5) {
                log.warn(`Incorreto - ${5 - tentativas} tentativas restantes`)
            }
            if (tentativas == 5) {
                log.warn('Incorreto')
                log.error('Tentativas esgotadas')
                log.info(`A resposta era ${matriz.getX()}`)
            }
        }
    } while (!status && tentativas < 5)
}
else if (tipo == 'd3e') {
    const matriz = new MatrizManager(3, 'x')
    const rep = matriz.toString()
    log.success('Matriz gerada')
    log.info(rep)
    const determinante = matriz.det
    log.info(`Resultado = ${determinante}`)
    
    let status = false
    let tentativas = 0
    
    do {
        const x = await text({
            message: "Qual o valor de x?"
        })
        if (Number(x) == matriz.getX()) {
            log.success('Correto')
            status = true
        } else {
            tentativas ++
            if (tentativas != 5) {
                log.warn(`Incorreto - ${5 - tentativas} tentativas restantes`)
            }
            if (tentativas == 5) {
                log.warn('Incorreto')
                log.error('Tentativas esgotadas')
                log.info(`A resposta era ${matriz.getX()}`)
            }
        }
    } while (!status && tentativas < 5)
}

let execucoes = 0
log.info("Finalizando execucao")
const intervalo = setInterval(() => {
    log.info((5 - execucoes).toString())
    execucoes ++
    if (5 - execucoes == -1) {
        outro("Finalizado")
        clearInterval(intervalo)
    }
}, 1000)

