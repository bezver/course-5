import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/Auth.service";
import { LoginService } from "../../services/Login.service";

export default function VerifyUser() {
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  if (verificationToken) {
    AuthService.verifyUser(verificationToken)
      .then((authToken) => {
        LoginService.login(authToken);
        toast.success("User successfully confirmed");
      })
      .catch((error) => {
        navigate("/login");
        toast.error(error.message);
      });
  } else {
    navigate("/login");
  }

  return <></>;
}
