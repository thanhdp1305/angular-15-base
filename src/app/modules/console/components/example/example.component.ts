import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEXP_DATE_INPUT, REGEXP_EMAIL } from '../../../shared/configs/regexp';
import { ModalControl } from '../../../shared/services/modal-control.service';
import { ToastService } from '../../../shared/services/toast.service';
import * as moment from 'moment';
import { LoaderService } from 'src/app/modules/shared/services/loader.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit, AfterViewInit {
  formDateInput!: FormGroup;
  today = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');

  constructor(
    private fb: FormBuilder,
    private modalcontrol: ModalControl,
    private toastControl: ToastService,
    private loader: LoaderService
  ) {
    this.makeForm();
    this.makeFormValidation();
  }

  ngAfterViewInit(): void {
    //
  }

  ngOnInit(): void {
    //
  }

  makeForm() {
    this.formDateInput = this.fb.group({
      datepicker: ['', Validators.pattern(REGEXP_DATE_INPUT)],
      dateInputMask: ['', Validators.pattern(REGEXP_DATE_INPUT)],
      daterange: ['']
    });
  }

  /**
   * Mở popup thông báo
   */
  openModal() {
    this.modalcontrol.show({
      title: 'modal_title_noti',
      content: 'text_no_results',
      showConfirmButton: true,
      confirmButton: {
        title: 'btn_confirm',
        callback: () => {
          //
        }
      },
      cancelButton: {
        title: 'btn_cancel',
        callback: () => {
          //
        }
      }
    });
  }

  openModalError() {
    this.modalcontrol.showError(null);
  }

  //VALIDATION FORM
  formValidation!: FormGroup;
  formValidationIsSubmit = false;
  validationError = {
    email: {
      required: 'Vui lòng nhập email',
      pattern: 'Sai định dạng email'
    }
  };

  /**
   * Khởi tạo form
   */
  makeFormValidation() {
    this.formValidation = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(REGEXP_EMAIL)]]
    });
  }

  /**
   * Submit form
   */
  submitFormValidation() {
    this.formValidationIsSubmit = true;
  }

  //Toast
  toast() {
    this.toastControl.jqueryToastAdminLte('Notification', 'Here is your notification content.');
  }

  toastSweet2() {
    this.toastControl.sweet2ToastNoti('Your work has been saved', 'success');
  }

  toastSnackBar(): void {
    this.toastControl.toastSnackBar();
  }

  //TABLES
  page = 1;
  totalRecords = 30;
  pageSize = 10;
  loadData(page: any) {
    this.page = page;
  }

  //Ng Select
  items = [
    { value: 1, label: 'Giá trị 1' },
    { value: 2, label: 'Giá trị 2' },
    { value: 3, label: 'Giá trị 3' },
    { value: 4, label: 'Giá trị 4' }
  ];
  selectedItem: any = null; //Giá trị mặc định của ng-select là null
  eventChangeSelected: any = null;

  /**
   * Bắt sự kiện thay đổi giá trị trên ng-select
   * @param e giá trị trả về
   */
  handleEventNgSelect(e: any) {
    this.eventChangeSelected = e;
  }

  showLoader(): void {
    this.loader.showLoader();
    setTimeout(() => {
      this.loader.hideLoader();
    }, 3000);
  }
}
