<?php
namespace samples {

	require_once "base/baseServiceRepository.php";

	class Samples extends \serviceRepository\BaseServiceRepository {

		public function __construct() {		
			parent::__construct();		
		}	

		public function getSamples() {
			$query = "SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM demo_samples c order by c.customerNumber desc";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0) {
				$result = array();
				while($row = $r->fetch_assoc()) {
					$result[] = $row;
				}
				return $result;
			}

			return NULL;
		}
	}
}