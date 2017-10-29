declare var $: any;
export class Modal {
  title: string;
  content: string;
  openstate(content: string): void {
    this.content = content;
    if ($('#modal-state')[0]) {
      $('#modal-state').find('.modal-body').html(this.content);
    }else {
      const state = `
      <div class="modal fade" id="modal-state">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-body">${this.content}</div>
            </div>
          </div>
        </div>
      `;
      $('body').append(state);
    }
    $('#modal-state').modal('show');
    setTimeout(() => {
      $('#modal-state').modal('hide');
    }, 1000);
  }

}
