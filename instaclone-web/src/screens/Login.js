import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import routes from "./routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";
import Notification from "../components/auth/Notification";
const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation($username:String!, $password:String!){
    login(username:$username, password:$password){
      ok
      token
      error
    }
  }
`

function Login() {
  const location = useLocation();
  console.log(location)
  const {register, handleSubmit, formState, setError, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    }
  });
  const onCompleted = (data) => {
    const {login: {ok, error, token}} = data;
    if(!ok){
      return setError("result", {
        message: error
      });
    }
    if(token){
      logUserIn(token);
    }
  }
  const [login, {loading}] = useMutation(LOGIN_MUTATION, {
    onCompleted})
  const onValid = (data) =>{
    if (loading) {
      return ;
    }
    const {username, password} = data;
    login({
      variables: {username, password}
      })
    }
  const clearLoginError = () => {
      clearErrors("result");
    }
  return (
    <AuthLayout>
      <PageTitle titleName="login"/>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification message={location?.state?.message} />
        <form onSubmit={handleSubmit(onValid)} style={{marginTop:15}}>
          <Input 
            {...register('username', {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 characters."
              }  
            })}
            onFocus={clearLoginError}
            type="text"
            placeholder="Username" 
            hasError={Boolean(formState.errors?.username?.message)}
          />
          <FormError message={formState.errors?.username?.message}/>

          <Input 
            {...register('password', {required: "Password is required"})}
            onFocus={clearLoginError}
            type="password" 
            placeholder="Password"
            hasError={Boolean(formState.errors?.password?.message)}
            />
          <FormError message={formState.errors?.password?.message}/>

          <Button type="submit" value={loading ? "Loading..." : "Log in"} disabled={!formState.isValid || loading}/>
          <FormError message={formState.errors?.result?.message}/>
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox 
      cta="Don't have an account?"
      linkText="Sign Up"
      link={routes.signUp}/>
    </AuthLayout>
  );
}

export default Login;