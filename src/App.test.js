const { handleSubmit } = require('./App');

test('입력한 이메일 주소에는 @ 문자가 1개만 있어야 이메일 형식이다.', () => {
    expect(handleSubmit("my-email@domain.com")).toEqual(true);
    expect(handleSubmit("my-email@@@domain.com")).toEqual(false);
})
test('입력한 이메일 주소에 공백(스페이스)가 있으면 이메일 형식이 아니다.', () => {
    expect(handleSubmit("my-email@domain.com")).toEqual(true);
    expect(handleSubmit("my-ema il@domain.com")).toEqual(false);
})
test('입력한 이메일 주소 맨 앞에 하이픈(-)가 있으면 이메일 형식이 아니다.', () => {
    expect(handleSubmit("my-e-mail@domain.com")).toEqual(true);
    expect(handleSubmit("-my-email@domain.com")).toEqual(false);
})

// describe('App component', () => {
//   test('renders without crashing', () => {
//     render(<App />);
//   });
// });

// test('이메일 검증', () => {
//   render(<App />);
//   const emailInput = screen.getByPlaceholderText('이메일');

//   fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
//   fireEvent.submit(emailInput);

//   expect(screen.getByText('이메일 형식이 올바르지 않습니다.')).toBeInTheDocument();
// });