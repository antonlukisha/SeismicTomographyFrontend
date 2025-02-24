import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '../components/RegisterForm';
import { registerUser } from '../api/user/registerUser';

// Mock the external modules and functions
jest.mock('../api/user/registerUser');
jest.mock('../utils/validators', () => ({
  isPasswordStrong: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('RegisterForm', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    registerUser.mockReset();
    jest.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  test('renders form fields and buttons', () => {
    render(<RegisterForm />);

    // Check that all form fields are rendered
    expect(screen.getByLabelText(/имя пользователя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/подтвердите пароль/i)).toBeInTheDocument();
    expect(screen.getByText(/показать пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /зарегистрироваться/i })).toBeInTheDocument();
  });

  test('shows error message when passwords do not match', async () => {
    render(<RegisterForm />);

    // Fill in the form
    userEvent.type(screen.getByLabelText(/имя пользователя/i), 'testuser');
    userEvent.type(screen.getByLabelText(/пароль/i), 'Password123');
    userEvent.type(screen.getByLabelText(/подтвердите пароль/i), 'Password321');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/пароли не совпадают/i)).toBeInTheDocument();
    });
  });

  test('shows error message when password is weak', async () => {
    jest.mocked(isPasswordStrong).mockReturnValue(false);

    render(<RegisterForm />);

    // Fill in the form
    userEvent.type(screen.getByLabelText(/имя пользователя/i), 'testuser');
    userEvent.type(screen.getByLabelText(/пароль/i), 'weak');
    userEvent.type(screen.getByLabelText(/подтвердите пароль/i), 'weak');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/пароль должен иметь не менее 8 символов/i)).toBeInTheDocument();
    });
  });

  test('shows success message and redirects on successful registration', async () => {
    registerUser.mockResolvedValue({ status: 201 });

    render(<RegisterForm />);

    // Fill in the form
    userEvent.type(screen.getByLabelText(/имя пользователя/i), 'testuser');
    userEvent.type(screen.getByLabelText(/пароль/i), 'Password123');
    userEvent.type(screen.getByLabelText(/подтвердите пароль/i), 'Password123');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    // Wait for success message and redirection
    await waitFor(() => {
      expect(screen.getByText(/регистрация прошла успешно/i)).toBeInTheDocument();
    });

    // Check that navigate was called for redirection
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('shows error message on registration failure', async () => {
    registerUser.mockRejectedValue(new Error('Network Error'));

    render(<RegisterForm />);

    // Fill in the form
    userEvent.type(screen.getByLabelText(/имя пользователя/i), 'testuser');
    userEvent.type(screen.getByLabelText(/пароль/i), 'Password123');
    userEvent.type(screen.getByLabelText(/подтвердите пароль/i), 'Password123');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /зарегистрироваться/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/произошла ошибка/i)).toBeInTheDocument();
    });
  });

  test('password visibility toggle works correctly', () => {
    render(<RegisterForm />);

    // Check if the password is initially hidden
    expect(screen.getByLabelText(/пароль/i)).toHaveAttribute('type', 'password');

    // Click the "Show Password" button
    fireEvent.click(screen.getByText(/показать пароль/i));

    // Check if the password is now visible
    expect(screen.getByLabelText(/пароль/i)).toHaveAttribute('type', 'text');
  });
});
