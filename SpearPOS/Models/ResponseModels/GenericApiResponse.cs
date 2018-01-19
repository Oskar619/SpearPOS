using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpearPOS.Models.ResponseModels
{
    public class GenericApiResponse
    {
        public bool Success { get; set; }
        public int Error { get; set; }
        public string Message { get; set; }
    }

    public class GenericApiResponseWithResult<TResult> : GenericApiResponse
    {
        public TResult Result { get; set; }
    }
}
