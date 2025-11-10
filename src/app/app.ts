import { Component, signal, OnInit, inject, DestroyRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NameDialog } from './name-dialog/name-dialog';
import { User } from './services/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatDialogModule, CommonModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {


  private readonly destroyRef = inject(DestroyRef);
  private readonly destroy$ = new Subject<void>();
  protected readonly title = signal('pokeView');
  private readonly router = inject(Router);

  userName: string | null = null;
  userName$: any;


  constructor(private readonly dialog: MatDialog, private readonly userService: User, private readonly cdr: ChangeDetectorRef) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.userService.userName$
      .pipe(takeUntil(this.destroy$))
      .subscribe(name => {
        console.log('userName$ emitió:', name);
        this.userName = name;
      });
      queueMicrotask(() => this.openDialog());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NameDialog, { disableClose: true });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(name => {
        if (name?.trim()) {
          this.userService.setUserName(name.trim());
          this.cdr.markForCheck();
        } else {
          this.openDialog();
        }
      });
  }
  redirectAdd(): void {
    this.router.navigate(['/add']);
  }
  
}
