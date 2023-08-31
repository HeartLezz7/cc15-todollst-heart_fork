import ListItem from "./ListItem"
// props = {
//     lists : Array<{
//         id:Number,
//         text:String,
//         icon:<Component/>,
//         active:true
//     }>
// }

function Lists(props) {
    return(
    <>
        <ul className="list">
            {props.data.map((obj)=>
            <ListItem key={obj.key} text={obj.text} icon={obj.icon} active={obj.active} />
            )}
        </ul>
    </>
    );
}

export default Lists;