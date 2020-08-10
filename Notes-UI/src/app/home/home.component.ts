import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User, Note } from '@app/_models';
import { AccountService, NoteService, AlertService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit{
    @ViewChild('closebutton') closebutton;
    user: User;
    notes = null;
    form: FormGroup;
    isAddMode: boolean = true;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private noteService: NoteService) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.noteService.getAll()
            .pipe(first())
            .subscribe(notes => this.notes = notes);
        
        this.form = this.formBuilder.group({
            id: [''],
            title: ['', Validators.required],
            description: ['', Validators.required],
            isDone: [false],
            isArchive: [false],
            createdBy: [this.user.id]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();
        
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        
        if (this.isAddMode){
            this.createNote()
        } else {
            this.updateNote()
        }
    }

    private createNote() {
        
        this.f.id.setValue(null);
        console.log(this.form.value);
        this.noteService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Note added successfully', { keepAfterRouteChange: true });
                    this.closebutton.nativeElement.click();
                    this.ngOnInit()
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateNote() {
        this.isAddMode = true
        this.noteService.update(this.form.value.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Note updated successfully', { keepAfterRouteChange: true });
                    this.closebutton.nativeElement.click();
                    this.ngOnInit()
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    editClick(id: string) {
        this.isAddMode = false
        this.noteService.getById(id)
            .pipe(first())
            .subscribe(
                x => {
                    this.f.id.setValue(x.id);
                    this.f.title.setValue(x.title);
                    this.f.description.setValue(x.description);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    deleteUser(id: string) {
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => { this.ngOnInit()});
    }

    deleteClick(id: string) {
        this.noteService.delete(id)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Note Deleted successfully', { keepAfterRouteChange: true });
                    this.ngOnInit()
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}