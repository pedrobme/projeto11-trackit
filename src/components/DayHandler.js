import dayjs from 'dayjs'
import "dayjs/locale/pt-br"

export default function DayHandler() {
    let now = dayjs().locale('pt-br');
    return <p>{now.format("dddd, D/MMMM")}</p>
}