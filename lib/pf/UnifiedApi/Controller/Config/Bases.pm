package pf::UnifiedApi::Controller::Config::Bases;

=head1 NAME

pf::UnifiedApi::Controller::Config::Bases - 

=cut

=head1 DESCRIPTION

pf::UnifiedApi::Controller::Config::Bases

=cut

use strict;
use warnings;
use pf::constants::pfconf;

use Mojo::Base qw(pf::UnifiedApi::Controller::Config);

has 'config_store_class' => 'pf::ConfigStore::Pf';
has 'form_class' => 'pfappserver::Form::Config::Pf';
has 'primary_key' => 'base_id';

use pf::ConfigStore::Pf;
use pf::config;
use pf::util;
use pfappserver::Form::Config::Pf;

sub form_parameters {
    my ($self, $item) = @_;
    my $name = $self->id // $item->{id};
    if (!defined $name) {
        return [];
    }
    return [section => $name];
}

sub items {
    my ($self) = @_;
    my $cs = $self->config_store;
    my $items = $cs->readAll('id');
    return [
        map {$self->cleanup_item($_)} grep { exists $pf::constants::pfconf::ALLOWED_SECTIONS{$_->{id}} } @$items
    ];
}

sub cached_form {
    undef;
}

sub test_smtp {
    my ($self) = @_;
    my ($error, $json) = $self->get_json;
    if (defined $error) {
        return $self->render_error(400, "Bad Request : $error");
    }

    my $form = $self->form({ id => "alerting" });
    $form->process(params => $json);
    if ($form->has_errors) {
        return $self->render_error(422, "Invalid parameters", $self->format_form_errors($form));
    }

    my $alerting_config = $form->value;
    my $email = $json->{'test_emailaddr'} || $alerting_config->{emailaddr};
    my $msg = MIME::Lite->new(
        To => $email,
        Subject => "PacketFence SMTP Test",
        Data => "PacketFence SMTP Test successful!\n"
    );

    my $results = eval {
        pf::config::util::do_send_mime_lite($msg, %$alerting_config);
    };

    if ($@) {
        return $self->render_error(400, pf::util::strip_filename_from_exceptions($@));
    }

    return $self->render(json => { message => 'Testing SMTP success' });
}

=head2 fields_to_mask

fields_to_mask

=cut

sub fields_to_mask { qw(smtp_password pass galera_replication_password) }

=head1 AUTHOR

Inverse inc. <info@inverse.ca>

=head1 COPYRIGHT

Copyright (C) 2005-2020 Inverse inc.

=head1 LICENSE

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301,
USA.

=cut

1;
