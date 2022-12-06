export const stateMsg = (stateMsg: string) => {
  const msg = document.createElement('div');
  msg.classList.add('msg')
  stateMsg.includes('Err') || stateMsg.includes('del') ? msg.classList.add('err') : msg.classList.remove('err'); 
  document.body.appendChild(msg);
  
  switch (stateMsg) {
    case 'createErr' :
      msg.innerText = 'TODO 추가에 실패했습니다!'
      break;
    case 'deleteErr' :
      msg.innerText = 'TODO 삭제에 실패했습니다!'
      break;
    case 'deleteCompErr' :
      msg.innerText = '완료된 TODO 삭제에 실패했습니다!'
      break;
    case 'updateErr' :
      msg.innerText = 'TODO 수정에 실패했습니다!'
      break;
    case 'compEditAllErr' :
      msg.innerText = '전체 TODO 완료/미완료 체크에 실패했습니다!'
      break;
    case 'orderChgErr' :
      msg.innerText = 'TODO 순서 변경에 실패했습니다!'
      break;
    case 'create' :
      msg.innerText = 'TODO가 추가되었습니다!'
      break;
    case 'delete' :
      msg.innerText = 'TODO가 삭제되었습니다!'
      break;
    case 'deleteComp' :
      msg.innerText = '완료된 TODO가 삭제되었습니다!'
      break;
    case 'update' :
      msg.innerText = 'TODO가 수정되었습니다!'
      break;
    case 'compEditAll' :
      msg.innerText = '전체 TODO 완료/미완료 체크가 되었습니다!'
      break;
    case 'orderChg' :
      msg.innerText = 'TODO 순서가 변경되었습니다!'
      break;
  }
  
  setTimeout(()=>{
    document.body.removeChild(msg);
  },1900)
}