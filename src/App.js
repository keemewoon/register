import { useState} from 'react'
import './App.css';
 
/**
* ## Jest, Git
* 
* [1] 회원가입폼 만들기
* 요구사항 :
*   비밀번호 *(마스킹), 특수문자(2개 이상), 아이디 공백, 키보드 엔터(button → enter),  
*   이메일 형식 체크, 비밀번호와 비밀번호 확인이 같은지, 같지 않으면 테두리 빨간색
*/

function App(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');


  const isEmail = (value) => {
    const email = value || "";
    const [localPart, domain, ...etc] = email.split("@");
    
    if (!localPart || !domain || etc.length) {
        return false;
    } else if (email.includes(" ")) {
        return false;
    } else if (email[0] === "-") {
        return false;
    } else if (!/^[a-z0-9+_-]+$/gi.test(localPart)) {
        return false;
    } else if (!/^[a-z0-9.-]+$/gi.test(domain)) {
        return false;
    }
    return true;
  }



  // validation check
  const handleSubmit = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const specialCharsCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;



    //이메일
    if (!emailRegex.test(email)) {
      e.preventDefault(); // 유효성 검사가 실패하면 폼 제출을 막는다.
      //alert("이메일 형식이 올바르지 않습니다.");
      return false;
    }
    if(email.indexOf(" ") == 0){
      e.preventDefault(); 
      //alert("이메일에 공백이 포함되어 있습니다.");
      return false;
    }
    //비밀번호
    if (specialCharsCount < 2) {
      e.preventDefault(); 
      //alert("비밀번호에 특수문자는 2개 이상 포함되어야 합니다.");
      return false;
    }
    //alert(`가입완료! \n[아이디]${email} \n[비밀번호]${password}`);
    return true;
  
  };

  //엔터키 이벤트
  const keypressEvent = (e) => {
    if(e.key === "Enter" ) {
      handleSubmit(e);
    }
  };

  return (
    <div className="App">
      <h1>register test</h1>
      <form onSubmit={handleSubmit}>
        <span>이메일 : </span>
        <input
          name="email"
          value={email}
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
         <span>비밀번호 : </span>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
         <span>비밀번호 확인 : </span>
         <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            placeholder="비밀번호 확인"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            onKeyUp={keypressEvent}
            className={password !== passwordConfirm && passwordConfirm.length !== 0 ? "not-equals" : ""} //패스워드가 일치하지 않을때 css적용
          /><br/>
          <input type="submit" value="가입하기"/>
 
          {password !== passwordConfirm && <p>비밀번호가 일치하지 않습니다.</p>}

      </form>
    </div>
    
  );
}

export default App;
