import {
    Alert,
    AlertDescription,
    AlertIndicator,
    Button,
    Card,
    Input,
    Label,
    Separator,
    TextField,
} from "@heroui/react";

export function LoginView(props) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
            <Card className="w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-sm">
                <Card.Header className="flex flex-col items-center gap-3 px-8 pt-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-900 text-xl font-semibold text-white">
                        T
                    </div>
                    <div>
                        <Card.Title className="text-2xl font-semibold text-gray-950">
                            Login
                        </Card.Title>
                        <Card.Description className="mt-1 text-sm text-gray-500">
                            Welcome back
                        </Card.Description>
                    </div>
                </Card.Header>

                <Card.Content className="px-8 pb-8 pt-6">
                    {props.error && (
                        <Alert status="error" className="mb-4">
                            <AlertIndicator />
                            <AlertDescription>{props.error}</AlertDescription>
                        </Alert>
                    )}

                    {props.resetMessage && (
                        <Alert status="success" className="mb-4">
                            <AlertIndicator />
                            <AlertDescription>{props.resetMessage}</AlertDescription>
                        </Alert>
                    )}

                    {/* disables the browser's built-in validation popup */}
                    <form className="flex flex-col gap-4" onSubmit={submitLoginACB} noValidate>
                        <TextField
                            isRequired
                            value={props.email}
                            onChange={props.onEmailChange}
                            className="w-full"
                        >
                            <Label className="mb-1 block text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <Input
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </TextField>

                        <TextField
                            isRequired
                            value={props.password}
                            onChange={props.onPasswordChange}
                            className="w-full"
                        >
                            <div className="mb-1 flex items-center justify-between">
                                <Label className="text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                <button
                                    type="button"
                                    onClick={props.onForgotPassword}
                                    className="text-xs text-blue-600 hover:text-blue-700"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <Input
                                type="password"
                                autoComplete="current-password"
                                placeholder="Password"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </TextField>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            isDisabled={props.loading}
                        >
                            {props.loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <Separator className="flex-1" />
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            or
                        </span>
                        <Separator className="flex-1" />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        fullWidth
                        isDisabled={props.loading}
                        onPress={props.onGoogleLogin}
                        className="gap-2"
                    >
                        <span className="font-semibold">G</span>
                        {props.loading ? "Please wait..." : "Sign in with Google"}
                    </Button>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <a href="#/register" className="font-medium text-blue-600 hover:text-blue-700">
                            Register
                        </a>
                    </p>
                </Card.Content>
            </Card>
        </main>
    );

    function submitLoginACB(evt) {
        evt.preventDefault();
        props.onLogin();
    }
}
