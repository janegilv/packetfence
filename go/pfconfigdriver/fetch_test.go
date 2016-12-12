package pfconfigdriver

import (
	"github.com/davecgh/go-spew/spew"
	"github.com/inverse-inc/packetfence/go/firewallsso/lib"
	"testing"
)

func TestFetchSocket(t *testing.T) {
	result := FetchSocket(`{"method":"element", "key":"resource::fqdn","encoding":"json"}` + "\n")
	expected := `{"element":"pf-julien.inverse.ca"}`
	if string(result) != expected {
		t.Errorf("Response payload isn't correct '%s' instead of '%s'", result, expected)
	}
}

func TestFetchDecodeSocket(t *testing.T) {
	general := PfConfGeneral{}
	FetchDecodeSocketStruct(&general)

	if general.Domain != "inverse.ca" {
		t.Error("PfConfGeneral wasn't fetched and parsed correctly")
		spew.Dump(general)
	}

	firewall := libfirewallsso.FirewallSSO{}
	firewall.PfconfigHashNS = "test"
	FetchDecodeSocketStruct(&firewall)
	spew.Dump(firewall)

	iboss := libfirewallsso.Iboss{}
	iboss.PfconfigHashNS = "test"
	FetchDecodeSocketStruct(&iboss)

	if iboss.Port != "8015" || iboss.Type != "Iboss" {
		t.Error("IBoss wasn't fetched and parsed correctly")
		spew.Dump(iboss)
	}

	var sections ConfigSections
	sections.PfconfigNS = "config::Pf"
	FetchDecodeSocketStruct(&sections)

	generalFound := false
	for i := range sections.Keys {
		if sections.Keys[i] == "general" {
			generalFound = true
		}
	}

	if !generalFound {
		t.Error("pf.conf sections couldn't be fetched correctly")
		spew.Dump(sections)
	}

}
