using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Enums
{


    public enum ErrorCodes
    {
        RetailScreenNotFoundTicket = 1,
        InternalServerError = 2
    }

    public static class ErrorMessages
    {
        public static string RetailScreenNotFoundTicket = "Could not find Ticket with the sent Id (Error Code 1).";
    }
}
