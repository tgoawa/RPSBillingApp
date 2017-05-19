export class Client {
    ClientId: number;
    ClientName: string;
}

export class RpsClient {
    ClientId: number;
    ClientName: string;
    MaintenanceFees: number;
    Year: number;
    Quarter: number;
    NumParticipants: number;
    DollarPerParticipant: number;
    ParticipantDollars: number;
    NumLoans: number;
    DollarsPerLoan: number;
    LoanDollars: number;
    Form5500: number;
    Form8955: number;
    SpecialFeesText: string;
    SpecialFeesDollars: number;
    NumDistributions: number;
    DollarsPerDistribution: number;
    DistributionDollars: number;
    Assets: number;
    BasisPointFee: number;
    Credits: number;
    Id: number;
}

export class RpsCurrentBill {
    Assets: number;
    BasisPointFee: number;
    ClientId: number;
    Credits: number;
    DistributionDollars: number;
    DollarPerParticipant: number;
    Form5500: number;
    Form8955: number;
    Id: number;
    LoanDollars: number;
    MaintenanceFees: number;
    NumDistributions: number;
    NumLoans: number;
    NumParticipants: number;
    ParticipantDollars: number;
    Quarter: number;
    SpecialFeesDollars: number;
    SpecialFeesText: string;
    Year: number;
};
