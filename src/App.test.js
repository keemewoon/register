import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('이메일 형식 검증', () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText('이메일');
  const submitButton = screen.getByText('가입하기');

  // 올바른 이메일 형식 입력
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.click(submitButton);
  expect(screen.queryByText('이메일 형식이 올바르지 않습니다.')).not.toBeInTheDocument();

  // 이메일에 공백 포함
  fireEvent.change(emailInput, { target: { value: ' test@example.com' } });
  fireEvent.click(submitButton);
  expect(screen.getByText('이메일 형식이 올바르지 않습니다.')).toBeInTheDocument();
});

test('비밀번호 특수문자 검증', () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText('비밀번호');
  const passwordConfirmInput = screen.getByPlaceholderText('비밀번호 확인');
  const submitButton = screen.getByText('가입하기');

  // 올바른 비밀번호 입력 (특수문자 2개 이상 포함)
  fireEvent.change(passwordInput, { target: { value: 'test@123' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'test@123' } });
  fireEvent.click(submitButton);
  expect(screen.queryByText('비밀번호에 특수문자는 2개 이상 포함되어야 합니다.')).not.toBeInTheDocument();

  // 특수문자 2개 미만인 비밀번호 입력
  fireEvent.change(passwordInput, { target: { value: 'test123' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'test123' } });
  fireEvent.click(submitButton);
  expect(screen.getByText('비밀번호에 특수문자는 2개 이상 포함되어야 합니다.')).toBeInTheDocument();
});

test('비밀번호 일치 검증', () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText('비밀번호');
  const passwordConfirmInput = screen.getByPlaceholderText('비밀번호 확인');
  const submitButton = screen.getByText('가입하기');

  // 올바른 비밀번호 입력 (일치)
  fireEvent.change(passwordInput, { target: { value: 'test@123' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'test@123' } });
  fireEvent.click(submitButton);
  expect(screen.queryByText('비밀번호가 일치하지 않습니다.')).not.toBeInTheDocument();

  // 비밀번호와 비밀번호 확인이 다른 경우
  fireEvent.change(passwordInput, { target: { value: 'test@123' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'test@456' } });
  fireEvent.click(submitButton);
  expect(screen.getByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
});
