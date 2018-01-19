using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models
{
    public class Transaction
    {
        [Key]
        public long Id { get; set; }
        public string PaymentType { get; set; }
        public string GlobalId { get; set; }
        public DateTime TransactionTime { get; set; }
        public double Amount { get; set; }
        public double TipsExceedAmount { get; set; }
        public double TinderAmount { get; set; }
        public string TransactionType { get; set; }
        public string CustomPaymentName { get; set; }
        public string CustomPaymentRef { get; set; }
        public string CustomPaymentFieldName { get; set; }
        public string PaymentSubType { get; set; }
        public bool Captured { get; set; }
        public bool Voided { get; set; }
        public bool Authorizable { get; set; }
        public string CardHolderName { get; set; }
        public string CardNumber { get; set; }
        public string CardAuthCode { get; set; }
        public string CardType { get; set; }
        public string CardTransactionId { get; set; }
        public string CardMerchanGateway { get; set; }
        public string CardReader { get; set; }
        public string CardAid { get; set; }
        public string CardARQC { get; set; }
        public string CardExtData { get; set; }
        public string GiftCertNumber { get; set; }
        public double GiftCertFaceValue { get; set; }
        public double GiftCertPaidAmount { get; set; }
        public double GiftCertCashBackAmount { get; set; }
        public bool DrawerResetted { get; set; }
        public string NoteVarchar { get; set; }
        public int TerminalId { get; set; }
        public UInt32 TicketId { get; set; }
        public int UserId { get; set; }
        public int PayoutReason { get; set; }
        public int PayoutRecipient { get; set; }

    }
}
