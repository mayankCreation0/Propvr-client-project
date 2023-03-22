import {
    FormControl,
    FormLabel,
    Input,
    Box,
    InputRightAddon,
    InputGroup,
    Heading,
    useToast,
    Button,
    Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from 'universal-cookie';
import { Context } from "../context/Context";
// import png from ' ../assets/Gmail_Logo_16px.png';

const LoginPage = () => {
    const navigate = useNavigate()
    const cookies = new Cookies();
    const { setAuth } = useContext(Context)
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:8080/users/login",
                input
            );
            // console.log(res.data);
            if (res.data) {
                // cookies.set('token', res.data.token, { path: '/' });

                setTimeout(() => {
                    // console.log(cookies.get('token'))
                }, 1000);
                toast({
                    title: 'LoggedIn Sucessfully.',
                    description: "Welcome!!",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                setLoading(false);
                navigate('/');
                setAuth(true);
            }
            else {
                toast({
                    title: "Invalid credentials",
                    description: "",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (e) {
            toast({
                title: "Invalid credentials",
                description: "",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            console.log(e);
        }
    };
    return (
        <div id="login" style={{ border: "1px solid red" }}>
            <>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        // backgroundImage:
                        //   "linear-gradient(to right top, #d2d7e0, #c8d3d7, #c3cdcd, #c1c7c3, #bfc0bc)",
                        backgroundColor: "#FFF",
                        padding: "20px",
                        width: "100%",
                        height: "auto",
                        borderRadius: "20px",
                    }}
                >
                    <FormControl>
                    <Heading fontFamily={"heading"} color={"ActiveCaption"}>Please login..</Heading>
                        <FormLabel htmlFor="String">Email</FormLabel>
                        <Input
                            type="String"
                            id="email"
                            name="email"
                            border="1px solid black"
                            bg="white"
                            ref={inputRef}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                bg="white"
                                // ref={inputRef}
                                border="1px solid black"
                                placeholder="Enter your password"
                                onChange={handleChange}
                            />
                            <InputRightAddon
                                onClick={() => setShowPassword(!showPassword)}
                                cursor="pointer"
                            >
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    cursor="pointer"
                                    border="1px solid black"
                                    onClick={() => setShowPassword(!showPassword)}
                                    size="lg"
                                />
                            </InputRightAddon>
                        </InputGroup>
                    </FormControl>
                    <Box  display={"inline-flex"}>
                        <button className="stylish-button" type="submit">
                            LOGIN{loading ? <Spinner /> : null}
                        </button>
                        <Link to='/signup'><Button colorScheme={"twitter"} style={{ borderBottom: '1px solid blue', color: 'white' ,marginTop:"30px" }} type="click">
                            New User
                        </Button></Link>
                    </Box>
                </form>
            </>
        </div>
    );
};

export default LoginPage;