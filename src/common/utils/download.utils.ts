import axios from "axios"
import fileDownload from "js-file-download"
import { toPng } from "html-to-image"
import { v4 as uuidv4 } from "uuid"

export const downloadFromUrl = async (url: string, extname: string = "png") => {
    const { data } = await axios.get(url, {
        responseType: "blob",
    })
    fileDownload(data, `${uuidv4()}.${extname}`)
}

export const downloadSVGAsPNG = async (id: string) => {
    const svg = document.getElementById(id)
    if (!svg) return
    const pngDataUrl = await toPng(svg)
    const pngBlob = await fetch(pngDataUrl).then((res) => res.blob())
    const pngUrl = URL.createObjectURL(pngBlob)
    downloadFromUrl(pngUrl)
}

export const downloadJson = async (json: Record<string, unknown>, fileName: string) => {
    const jsonData = JSON.stringify(json)
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${fileName}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}