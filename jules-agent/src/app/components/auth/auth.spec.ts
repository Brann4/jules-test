import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// FormsModule and CommonModule are imported by Auth component itself as it's standalone.
// No need to import them here separately for TestBed if Auth component handles its own dependencies.
import { Auth } from './auth';
// By is not typically needed for simple querySelector, but good to know if needed for complex queries.
// import { By } from '@angular/platform-browser';

describe('Auth Component Tests', () => {
  let component: Auth;
  let fixture: ComponentFixture<Auth>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auth] // Auth is standalone and imports its own dependencies (FormsModule, CommonModule)
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auth);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges(); // Initial data binding
  });

  it('should create the Auth component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the login form with username, password inputs and a login button', () => {
    const usernameInput = nativeElement.querySelector('input[name="username"]');
    const passwordInput = nativeElement.querySelector('input[name="password"]');
    const loginButton = nativeElement.querySelector('button[type="submit"]');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
    expect(loginButton?.textContent?.trim()).toBe('Login');
  });

  it('should bind username and password inputs to component properties via ngModel', fakeAsync(() => {
    const usernameInput = nativeElement.querySelector('input[name="username"]') as HTMLInputElement;
    const passwordInput = nativeElement.querySelector('input[name="password"]') as HTMLInputElement;

    usernameInput.value = 'testUser123';
    usernameInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'testPass123';
    passwordInput.dispatchEvent(new Event('input'));

    tick(); // Allow time for ngModel to update component properties
    fixture.detectChanges(); // Reflect updates in the component

    expect(component.username).toBe('testUser123');
    expect(component.password).toBe('testPass123');
  }));

  it('should display a success message and set loginSuccess to true on successful login', fakeAsync(() => {
    component.username = 'user'; // Set credentials directly or via input simulation
    component.password = 'password';

    const loginButton = nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    loginButton.click();

    tick(); // Allow time for login method and async operations if any
    fixture.detectChanges(); // Update view with message

    expect(component.authMessage).toBe('Login successful!');
    expect(component.loginSuccess).toBe(true);

    const messageDiv = nativeElement.querySelector('.mt-4.text-center');
    expect(messageDiv).toBeTruthy();
    expect(messageDiv?.textContent?.trim()).toBe('Login successful!');
    expect(messageDiv?.classList.contains('text-green-500')).toBe(true);
  }));

  it('should display an error message and set loginSuccess to false on failed login', fakeAsync(() => {
    component.username = 'wrongUser';
    component.password = 'wrongPassword';

    const loginButton = nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    loginButton.click();

    tick();
    fixture.detectChanges();

    expect(component.authMessage).toBe('Invalid username or password.');
    expect(component.loginSuccess).toBe(false);

    const messageDiv = nativeElement.querySelector('.mt-4.text-center');
    expect(messageDiv).toBeTruthy();
    expect(messageDiv?.textContent?.trim()).toBe('Invalid username or password.');
    expect(messageDiv?.classList.contains('text-red-500')).toBe(true);
  }));

  it('should not display any authentication message initially', () => {
    // Before any login attempt
    expect(component.authMessage).toBe('');
    expect(component.loginSuccess).toBe(false);
    const messageDiv = nativeElement.querySelector('.mt-4.text-center');
    // The message div is rendered with *ngIf="authMessage", so it shouldn't be in the DOM if authMessage is empty
    expect(messageDiv).toBeFalsy();
  });
});
