import { Fragment, useState } from "react";

let persons = [
  {
    id: 1,
    name: "khosro",
  },
  {
    id: 2,
    name: "amir",
  },
  {
    id: 3,
    name: "hamid",
  },
];

export default function Test() {
  const [color, setColor] = useState("red");
  const [pepole, setPeople] = useState(persons);
  // console.log(pepole);

  return (
    <>
      {pepole.map((item) => {
        return (
          <div key={item.id}>
            <p style={{ color: color }}> {item.name} </p>
          </div>
        );
      })}

      <p onClick={() => {
        
            if(color === 'red'){
                setColor('blue')
            }else {
                setColor('red')
            }

      }} style={{ color: "green"  , cursor : 'pointer'}}> 
        {
            color === 'red' ? 'change color to blue' : 'change color to red'
        }
       </p>
    </>
  );
}
