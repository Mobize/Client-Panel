import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(private clientService: ClientService,
              private router: Router,
              private route: ActivatedRoute,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client !== null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }

  updateBalance(id: string) {
    this.clientService.updateCLient(this.client);
    this.flashMessage.show('Montant mis à jour', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.showBalanceUpdateInput = false;
  }

  onDeleteClick() {
    if (confirm('Voulez-vous supprimer ce client?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Le client a été supprimé', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
