import React, { useEffect, useState }from 'react'
import axios from "axios"
import e from 'cors'


// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi


export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
const [email, setEmail] = useState(initialEmail);
const [message, setMessage] = useState(initialMessage);
const [steps, setSteps] = useState(initialSteps);
const [index, setIndex] = useState(initialIndex);
// const [konum, setKonum] = useState({x : 2, y : 2})
 const grid = ["(1, 1)", "(2, 1)", "(3, 1)",
  "(1, 2)", "(2, 2)", "(3, 2)",
   "(1, 3)", "(2, 3)", "(3, 3)"]

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    //  {konum.x === 1 && konum.y === 1 ? setIndex(0) : null}
    //  {konum.x === 2 && konum.y === 1 ? setIndex(1) : null}
    //  {konum.x === 3 && konum.y === 1 ? setIndex(2) : null}
    //  {konum.x === 1 && konum.y === 2 ? setIndex(3) : null}
    //  {konum.x === 2 && konum.y === 2 ? setIndex(4) : null}
    //  {konum.x === 3 && konum.y === 2 ? setIndex(5) : null}
    //  {konum.x === 1 && konum.y === 3 ? setIndex(6) : null}
    //  {konum.x === 2 && konum.y === 3 ? setIndex(7) : null}
    //  {konum.x === 3 && konum.y === 3 ? setIndex(8) : null}

     return grid[index]
    
  }
  // useEffect(getXY, [konum])

  function getXYMesaj(direction) {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
   if(direction === "left") {
    setMessage("Sola gidemezsiniz")
   } else if (direction === "up") {
    setMessage("Yukarıya gidemezsiniz")
   } else if  (direction === "down"){
    setMessage("Aşağıya gidemezsiniz")
   } else if (direction === "right") {
    setMessage("Sağa gidemezsiniz")
   }
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    // setKonum({
    //   x : 2,
    //   y : 2
    // }) 
    console.log("reset")
    setIndex(initialIndex)
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
 
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
  }

  function ilerle(direction) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
     
    if(direction == "left" && (index % 3 !== 0)) {
      setSteps(steps + 1);
      setIndex(index - 1);
    } else if (direction == "up" && index / 3 >= 1) {
      setSteps(steps + 1);
      setIndex(index - 3);
    } else if (direction == "right" && (index % 3 !== 2)) {
      setSteps(steps + 1);
      setIndex(index + 1);
    } else if (direction == "down" && index < 6) {
      setSteps(steps + 1);
      setIndex(index + 3);
    } else getXYMesaj(direction);
  }
  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
     evt.preventDefault()
     const veri = {
      x: grid[index][1],
      y: grid[index][4],
      steps: steps,
      email: email
     }
     setEmail(initialEmail)
     const config = {
      method: "post",
      url: "http://localhost:9000/api/result",
      headers: {
          "Content-Type": "application/json",
      },
      data: veri,
     };
  
  
     axios(config)
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message)
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={(e) => ilerle(e.target.id)}>SOL</button>
        <button id="up" onClick={(e) => ilerle(e.target.id)}>YUKARI</button>
        <button id="right" onClick={(e) => ilerle(e.target.id)}>SAĞ</button>
        <button id="down" onClick={(e) => ilerle(e.target.id)}>AŞAĞI</button>
        <button id="reset" onClick={() => reset()}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="email girin" onChange = {(e) => onChange(e)} value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
