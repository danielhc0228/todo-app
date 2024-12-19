import { useForm } from "react-hook-form";

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    password1: string;
}

function ToDoList() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IForm>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onValid = (data: IForm) => {
        if (data.password !== data.password1) {
            setError(
                "password1",
                { message: "Password is not equal" },
                { shouldFocus: true }
            );
        }
    };
    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSubmit(onValid)}
            >
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@gmail.com$/,
                            message: "Only gmail is allowed",
                        },
                    })}
                    placeholder='Email'
                />
                <span>{errors?.email?.message}</span>
                <input
                    {...register("firstName", {
                        required: "Write here",
                        validate: {
                            noDaniel: (value) =>
                                value.includes("Daniel")
                                    ? "No Daniels are allowed"
                                    : true,
                        },
                    })}
                    placeholder='First Name'
                />
                <span>{errors?.firstName?.message}</span>
                <input
                    {...register("lastName", { required: "Write here" })}
                    placeholder='Last Name'
                />
                <span>{errors?.lastName?.message}</span>
                <input
                    {...register("username", {
                        required: "Write here",
                        minLength: 10,
                    })}
                    placeholder='Username'
                />
                <span>{errors?.username?.message}</span>
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Your password is too short.",
                        },
                    })}
                    placeholder='Password'
                />
                <span>{errors?.password?.message}</span>
                <input
                    {...register("password1", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Your password is too short.",
                        },
                    })}
                    placeholder='Password1'
                />
                <span>{errors?.password1?.message}</span>
                <button>Add</button>
            </form>
        </div>
    );
}

export default ToDoList;
