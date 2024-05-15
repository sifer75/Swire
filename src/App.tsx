import "./index.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Page/Homepage";
import Login from "./Page/Account/Login";
import User from "./Page/Account/User";
import Fields from "./Page/Account/Fields";
import Target from "./Page/Account/Target";
import Disponibility from "./Page/Account/Disponibility";
import Location from "./Page/Account/Location";
import Swire from "./Page/Menu/Swire";
import Matching from "./Page/Menu/Matching";
import Account from "./Page/Menu/Account";
import ForgetEmail from "./Page/Forget/Email";
import ForgetPassord from "./Page/Forget/Password";
import CreateAccount from "./Page/Account/CreateAccount";
import Rhythm from "./Page/Account/Rhythm";
import Duration from "./Page/Account/Duration";
import Experience from "./Page/Account/Experience";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/creation/user" element={<User />} />
      <Route path="/creation/fields" element={<Fields />} />
      <Route path="/creation/target" element={<Target />} />
      <Route path="/creation/disponibility" element={<Disponibility />} />
      <Route path="/creation/rhythm" element={<Rhythm />} />
      <Route path="/creation/duration" element={<Duration />} />
      <Route path="/creation/experience" element={<Experience />} />
      <Route path="/creation/location" element={<Location />} />
      <Route path="/forget/email" element={<ForgetEmail />} />
      <Route path="/forget/password" element={<ForgetPassord />} />
      <Route path="/swire" element={<Swire />} />
      <Route path="/match" element={<Matching />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
