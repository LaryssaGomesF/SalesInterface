import { ButtonDefault } from "../../components/ButtonDefault";

export function Home(){
    return <div>
        <ButtonDefault onClick={()=> {console.log('teste')}} label="teste"/>
    </div>
}