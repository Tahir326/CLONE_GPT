import React, { useState } from 'react'
import CloneGpt from "../assets/CloneGpt.png";
import sendblack from "../assets/sendwhite.png";
import CloneGPT1 from "../assets/CloneGPT1.png";
import createnew from "../assets/createnew.png";
import upgrade from "../assets/upgrade.png";
import user from "../assets/user.png";




const Chat= () => {
    const{REACT_APP_OPENAI_API_KEY} =  process.env
    const suggestion = [
        'Plan a travel journey',
        'Suggest fun activities',
        'Expalin why popcorn pops',
        'Recomend a delicious dish'
        
      ]
   const [chat,setchat]=useState([]);
   const [input,setinput]=useState('');

   const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

   const handleSend = async () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      setchat([...chat, { role: 'user', content: input }]);
      setinput('');
  
      const data = {
        model: "gpt-3.5-turbo",
        
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          ...chat,
          { role: 'user', content: input },
        ],
      };
  
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${REACT_APP_OPENAI_API_KEY}`, 
            
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        const airesponse = result.choices[0].message.content;
        setchat([...chat, { role: 'user', content: input }, { role: 'assistant', content: airesponse }]);
      } 
      catch (error) {
        console.error(error);
      }
    }
  }
  

  return (
    <>
    {/* SIDEBAR */}
    <div className='flex flex-row overflow-hidden  bg-[#444458]'>
    <div className="md:w-[18%] md:h-screen bg-black text-[#ececf1] overflow-hidden hidden md:block  ">
        <div className='h-[83%] '>
          <div className="   py-7 flex flex-row justify-center items-center cursor-pointer  ">
            <img className='h-16 w-16 mt-1' src={CloneGPT1} alt="chatgpt1logo" />
            <div className="flex flex-col mx-2 ">
                <span className="text-[#ececf1]  font-bold text-xl hover:text-2xl">CLONE-GPT</span>
                <small className="text-[#c5c5c9] font-semibold">Made by M.Tahir</small>
            </div>
          </div>
          <div onClick={() => { setchat([]); setinput('');}}className=" p-2 flex flex-row justify-between items-center mx-16 rounded-2xl hover:bg-zinc-700 cursor-pointer border-2 border-zinc-700">
            
            <button  type="button" className="text-[#ececf1] mx-1 font-bold text-sm"> New chat +</button>
            <img className='h-4 w-4' src={createnew} alt="" />
          </div>
        </div>

        <div className='h-[17%]   '>

          <div className="flex flex-row justify-center items-start mx-5 mt-3 ">
                <div className=' cursor-pointer rounded-full h-fit w-fit flex justify-center items-center bg-black border-2 border-zinc-700 mt-1 mx-5 '><img className="h-8 w-8" src={upgrade} alt="" /></div>
              
                <div className="flex flex-col justify-start items-start -mx-2">
                  <span className='font-bold'>Upgrade plan</span>
                  <span className="font-extralight text-xs"> Get GPT-4, DALL·E, and more</span>
                </div>
          </div>

          <div className="flex flex-row justify-start mt-4 items-center mx-[3.5rem] ">

            <div className='rounded-full h-fit w-fit overflow-hidden bg-gray-400 cursor-pointer '><img className="h-9 w-9" src={user} alt="" /></div>
            <div className=" mx-3">USER</div>

          </div>

        </div>

      </div>
 
    
{/* MAIN CHAT SCREEN */}
    <div className='md:w-[82%] md:h-screen w-full h-[680px] bg-[#444458] overflow-hidden  '>

        {
            chat.length > 0?
            (
              <>
              <div className='bg-black text-white text-center p-1  sticky flex flex-row justify-center items-center shadow-sm md:hidden' >
                <div><img className='h-9 w-9 mt-1' src={CloneGPT1} alt="chatgpt1logo" /></div>
                  <div className='flex flex-col justify-center'>
                    <p className="text-[#ececf1]   text-sm ">CLONE-GPT</p>
                    <small className="text-[#c5c5c9] text-xs ml-4">Made by M.Tahir</small>
                </div>
              </div>
              <div className='md:h-[90%] md:w-auto   w-auto h-[78%]  overflow-scroll shadow-sm hide-scrollbar scroll-smooth' >
              
                {
                     chat.map((item,index) => {
                        return(
                        <div className={`md:w-[65%] w-[90%] mt-2 md:mt-0 mx-auto md:p-8 p-7 text-[#ececf1] flex  ${item.role==='assistant' && 'bg-[#65658b] rounded-xl overflow-y-auto'}`} >
                                <span className='mr-3 md:mr-0'>
                                   {
                                    item.role === 'user' ?
                                    (
                                     <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                    )
                                    :
                                    (
                                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                                      <path d="M12,1C5.938,1,1.005,5.935,1.005,12c0,5.491,4.097,10.179,9.562,10.906C10.662,22.916,11.513,23,12,23	c6.063,0,10.995-4.935,10.995-11S18.063,1,12,1z M18.918,13.137c-0.788,5.198-6.957,8.035-7.658,8.341l-1.4,0.612l-0.002-3.256	c0-0.061-0.036-0.115-0.088-0.132c-2.925-0.984-4.841-3.72-4.768-6.808c0.09-3.847,3.156-6.835,6.995-6.835c0.025,0,0.05,0,0.074,0	C15.892,5.099,19,8.239,19,12.063C19,12.421,18.973,12.782,18.918,13.137z"></path>
                                      </svg>
                                    )
                                   }
                                </span>
                                <div className='md:mx-12 mx-1 mt-1.5 md:mt-0.5 overflow-y-auto leading-loose' style={{whiteSpace : 'break-spaces'}}>
                                   {item.content}
                                </div>
                        </div>
                        )
                    })
                }

              </div>
              </>
            )
            :
            (
                <div className='md:h-[90%] md:w-auto   w-[100%] h-[85%] overflow-hidden  ' >
                <div className='bg-black text-white text-center p-1  sticky flex flex-row justify-center items-center md:hidden' >
                    <div><img className='h-9 w-9 mt-1' src={CloneGPT1} alt="chatgpt1logo" /></div>
                    <div className='flex flex-col justify-center'>
                      <p className="text-[#ececf1]   text-sm ">CLONE-GPT</p>
                      <small className="text-[#c5c5c9] text-xs ml-4">Made by M.Tahir</small>
                    </div>
                   </div>
                <div className='flex flex-col justify-center items-center mt-[11%]'>

                    <div>
                        <img className='h-36 w-36 mb-4' src={CloneGpt} alt="" />
                    </div>
                    <div className='text-[#ececf1] text-2xl font-semibold'>
                        How can I help you today?
                    </div>

                </div>

                <div className='flex flex-col justify-start items-center  '>
                    <div className='md:w-[69%] md:h-auto md:p-12 p-8  '>
                        < div  className ='grid grid-cols-2 gap-2' >
                            {suggestion.map((item) => {
                                return(
                                  <>                      
                                    <div   onClick={()=>setinput(item)}  className='rounded-xl p-4 bg-transparent ml-[4%] border-2 border-[#707087] text-[#ececf1] cursor-pointer hover:bg-[#707087]' >
                                      <button  className='font-semibold'>{item}</button>
                                    </div>


                                </>


                                )
                                
                            })}
                      
                        </div>


                    </div>

                </div>
            </div>

            )
        }


        <div className='md:h-[25%] md:w-auto h-[13%] w-auto mt-4   md:mt-1 overflow-hidden ' >
            <div className="md:mb-[50%] md:w-[65%]  md:h-auto md:ml-[17.75%] flex flex-col    md:mt-0">
                <div ><input  type="text" onKeyDown={handleKeyPress} value={input} onChange={(e)=>{setinput (e.target.value)}} id="text-input" placeholder='Type your message here.....' className="  bg-transparent focus:ring-transparent focus:outline-none focus:cursor-tex border-2 border-[#707087]  text-[#ececf1] text-sm rounded-lg block md:w-full w-[96%] ml-2 md:ml-0 p-2.5 pr-11 "/></div>
                <small className='text-[#e6e6f5] font-thin md:font-normal text-xs md:text-sm md:ml-[14%] ml-7 mt-0.5  '>This clone "CloneGPT" is using a free "OPENAI API".After <p className='text-center md:hidden '> some time  it may not work.</p><p className='hidden md:inline-block'>some time  it may not work</p></small>
            </div>

            <div onClick={()=>handleSend() }  className='absolute md:bottom-[2.1rem] md:right-[14.2rem] bottom-[2.7rem] right-[1.1rem] h-6 w-6 cursor-pointer'>
                <img  src={sendblack} alt="" />
            </div>
        </div>

    </div>

    </div>

    </>
  )
}

export default Chat;