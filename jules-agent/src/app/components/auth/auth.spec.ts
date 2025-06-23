import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Auth } from './auth';
import { By } from '@angular/platform-browser';

describe('Auth', () => {
  let component: Auth;
  let fixture: ComponentFixture<Auth>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Declare the component being tested and import necessary modules
      imports: [Auth] // Auth component itself imports FormsModule and CommonModule
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auth);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges(); // Initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render login form elements', () => {
    const usernameInput = nativeElement.querySelector('input[name="username"]');
    const passwordInput = nativeElement.querySelector('input[name="password"]');
    const loginButton = nativeElement.querySelector('button[type="submit"]');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
    expect(loginButton?.textContent?.trim()).toBe('Login');
  });

  it('should allow username and password input', fakeAsync(() => {
    const usernameInput = nativeElement.querySelector('input[name="username"]') as HTMLInputElement;
    const passwordInput = nativeElement.querySelector('input[name="password"]') as HTMLInputElement;

    usernameInput.value = 'testuser';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'testpass';
    passwordInput.dispatchEvent(new Event('input'));

    tick(); // Simulate the passage of time for data binding to occur
    fixture.detectChanges(); // Update component with new values

    expect(component.username).toBe('testuser');
    expect(component.password).toBe('testpass');
  }));

  it('should show success message on successful login', fakeAsync(() => {
    const usernameInput = nativeElement.querySelector('input[name="username"]') as HTMLInputElement;
    const passwordInput = nativeElement.querySelector('input[name="password"]') as HTMLInputElement;
    const loginButton = nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;

    usernameInput.value = 'user';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));

    tick();
    fixture.detectChanges();

    loginButton.click();
    tick();
    fixture.detectChanges();

    expect(component.authMessage).toBe('Login successful!');
    expect(component.loginSuccess).toBe(true);
    const messageDiv = nativeElement.querySelector('.mt-4.text-center');
    expect(messageDiv?.textContent?.trim()).toBe('Login successful!');
    expect(messageDiv?.classList.contains('text-green-500')).toBe(true);
  }));

  it('should show error message on failed login', fakeAsync(() => {
    const usernameInput = nativeElement.querySelector('input[name="username"]') as HTMLInputElement;
    const passwordInput = nativeElement.querySelector('input[name="password"]') as HTMLInputElement;
    const loginButton = nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;

    usernameInput.value = 'wronguser';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'wrongpass';
    passwordInput.dispatchEvent(new Event('input'));

    tick();
    fixture.detectChanges();

    loginButton.click();
    tick();
    fixture.detectChanges();

    expect(component.authMessage).toBe('Invalid username or password.');
    expect(component.loginSuccess).toBe(false);
    const messageDiv = nativeElement.querySelector('.mt-4.text-center');
    expect(messageDiv?.textContent?.trim()).toBe('Invalid username or password.');
    expect(messageDiv?.classList.contains('text-red-500')).toBe(true);
  }));

  it('should not show any message initially', () => {
    const messageDiv = nativeElement.querySelector('.mt-4.text-center');
    expect(messageDiv).toBeFalsy(); // The message div is conditionally rendered with *ngIf="authMessage"
    expect(component.authMessage).toBe('');
  });
});
