import { Controller, Post, Get, Body, Param, Delete, ParseIntPipe,Res,DefaultValuePipe,Query } from '@nestjs/common';
import { BlService } from './bl.service';
import { CreateBlDto } from './DTO/CreateBl.dto';
import { Bl } from './Bl.entity';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import {join } from 'path';
import * as fs from 'fs';
import { readdirSync } from 'fs';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ICustomPaginationOptions } from './DTO/ICustomPaginationOptions';


  

@Controller('bl')
export class BlController {
    constructor(private BlService: BlService
    ) { }

    //Api findAll BLs
    @Get()
    findAll() {
        return this.BlService.findAll();
    }

    //API find BL by id 
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.BlService.findOne(+id)
    }

    //API Delete BL by ID
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.BlService.remove(id)
    }


    //getBdlbydestinataireName

 /*   @Get(':id/colis')
    findColidByBlId(@Param('id') id: number){
     return this.BlService.findColisByBlId(id);
    }*/

    @Get(':id/User')
    async findUserByUserId(@Param('id')userId: number){
        return this.BlService.findUserByBlId(userId)
    }


  /*  @Get(':id/')
    async savePDF(filePath: string, res: Response,@Param('id') id: number): Promise<void> {


      try {
          const buffer = fs.readFileSync(filePath);
    

          res.set({
              'Content-Type': 'application/pdf',
              'Content-Disposition': `attachment; filename=${filename}`,
              'Content-Length': buffer.length.toString(),
          });
    
          // Envoyer le fichier au client
          res.end(buffer);
    
          
          // Supprimer le fichier après l'envoi (facultatif)
          fs.unlinkSync(filePath);
    
      } catch (error) {
          // Gérer les erreurs de lecture du fichier
          console.error('Erreur lors de la lecture du fichier PDF:', error);
          res.status(500).json({ message: 'Internal Server Error' });
      }
    }*/

    
    @Get(':idBl/createpdf')
    async generatePdf(@Param('idBl') idBl: number, @Res() res: Response) {
        try {

        const bl = await this.BlService.findOne(idBl);
        const user=await this.BlService.findUserByBlId(idBl);
      


        const fs = require("fs");
        const PDFDocument = require("pdfkit-table");
        const pdfDoc =new PDFDocument({ margin: 30, size: 'A4', });


        const leftColumnX = 50;
        const columnGap = 50;  // Adjust the gap between columns
        const rightColumnX = leftColumnX + columnGap;  // Calculate the X-coordinate for the right column
        const textOptions = {font:'Times-Roman',fontSize: 12};

     
        const x = 50;
        const y = 150;

      
        

        const xUpperRight = pdfDoc.page.width - 120; // Adjust as needed
        const yUpperRight = 10; // Adjust as needed
        
        // Coordinates for the center
        const xCenter = pdfDoc.page.width / 2;
        const yCenter = pdfDoc.y;
        

        const formattedDate = bl.dateBl.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });


        const site=""
       
        // Information Destinataire
  
        // Information Expediteur
        pdfDoc.fontSize(10)
        .text(' ',{align:'center'})
        .text(' ',{align:'center'})
        .text(`Tunis,Le ${formattedDate}`, {continued:true, align: 'left' })
        .text(`Nom:${bl.reference}`,{align:'right' })
        .text(`M.F/CIN :${user.matriculeFiscale}`, {continued:true, align: 'left'} )  
        .text(`Mob:${bl.Mob}`,{align:'right' })
        .text(`Fix:${bl.Fixe}`, {continued:true, align: 'left' })  
        .text(`Email:${bl.address}`,{align:'right' })
        .text('',{align:'left'})
        .moveDown()
     
        // Référence transportaur
        
        const pargraph="JAX EXPEDITION, entreprise totalement tunisienne, est ravie de vous présenter des solutions de transport adaptées à vos besoins, à travers son service de livraison express (JAX DELIVERY SERVICES) vous pouvez expédier nimporte où à lintérieu du territoire Tunisien dans un délais maximum (transit time) de 72h après lenlèvement du colis."
        
        pdfDoc
        .text(' ',{align:'left'})
        .text('Référence transporteur', { align: 'left', ...textOptions })
        .moveDown();
        // Now add content to the right colu
        

         /* const width = pdfDoc.widthOfString('Dates pervisionelles');
          const height = pdfDoc.currentLineHeight(0);
         /* pdfDoc.fontSize(12)
          .font('Helvetica-Bold')
          .underline(20, 0, width, height)
          .text(`Dates pervisionelles`, { align: 'left'}) // Set font size to 16
            .moveDown();*/

          pdfDoc.fontSize(9)
          .font('Helvetica')
            .text(`Date date a partir de date`, { align: 'left'}) // Set font size to 14
            .text(' ', { align: 'left' })
            .moveDown();

          pdfDoc.fontSize(9)
          .font('Helvetica')
          .text(`Bon de Livraison No: ${bl.reference}`, { align: 'center'}) // Set font size to 18
            .moveDown();

          pdfDoc.fontSize(9)
          .font('Helvetica')
          .text('Transporteur', { align: 'left', continued: true }) // Set font size to 12
            .text('Date d"enlévement: Date', { align: 'right' })
            .text('Téléphone', { align: 'left', continued: true }) // Set font size to 12
            .text('codeQR', { align: 'right'  })
            .moveDown();

         pdfDoc.lineWidth(1);
         //position
         const recyPosition = (pdfDoc.page.height/2)+40;//3aml 3al y =tul el page
         
         //Mesures 
         const widthShape=pdfDoc.page.width-40//3uredh
         const length=pdfDoc.page.height/7//tul


         const xWidth=pdfDoc.page.width
         const line=pdfDoc.page.width/2
         const yline=length+460

         //y el ktiba

         const text2 = [
          
        ];
        
        const text3 = [
          
        ];
        
        const textTitle2 = 'Information Expediteur';
        const textTitle3 = 'Information Destinateur';
        
        const text = `${text2.join('\n')}\n\n\n${text3.join('\n')}`;
        
        pdfDoc.y = recyPosition + 10;
        
        pdfDoc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text(textTitle2, { align: 'left', continued: true })
          .text('                                                     ', {continued: true})
          .text(textTitle3, { align: 'justify' });
        pdfDoc
          .fontSize(12)
          .font('Helvetica')
          .text(text, {
            x: 30,
            columns: 2,
            columnGap: 80,
            height: 85,
            align: 'justify'
          });
        
     
       
      pdfDoc
      .moveTo(line, recyPosition)
      .lineTo(line, yline)
      .lineJoin('round')
      .rect(20, recyPosition, widthShape, length)
      .stroke()
      .moveDown()
      .moveDown()
      .moveDown(); 

     

 

      pdfDoc.moveDown(pdfDoc.height)
      .fontSize(9)
          .font('Times-Italic')
          .text(`Signatute`, { align: 'right'}) // Set font size to 18
          

        //pdfDoc.text(`Destinataire Data:\n${JSON.stringify(destinataire)}`);

        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');



        

        const formattedDateTime = `${bl.id}-${year}-${month}-${day}_${hours}-${minutes}`;
         // Format date as 'YYYY-MM-DD'
    
        // Set headers for PDF download
        const dirPath = path.resolve(process.cwd(), '../../../BonDeLivraison');
        const dirPath2 = path.resolve(process.cwd(), 'Downloads');


        console.log('Directory path:', dirPath);
  
        if (!fs.existsSync(dirPath)) {
          console.log('Creating directory: downloads');
          fs.mkdirSync(dirPath, { recursive: true });
        }
  
      // const filePathlocal = `pdfdata.pfd${Date.now()}.pdf`;
      const filePathlocal = path.resolve(dirPath,  formattedDateTime+'.pdf');
      const filePathserver = path.resolve(dirPath2,  formattedDateTime+'.pdf');

      
        console.log('File path:', filePathlocal );
  
        await new Promise<void>((resolve, reject) => {
          pdfDoc.pipe(fs.createWriteStream(filePathlocal))
            .on('finish', () => {
              console.log('File writing finished');
              // Now, copy the file to the second directory
              fs.copyFile(filePathlocal, filePathserver, (err) => {
                if (err) {
                  console.error('Error copying file:', err);
                  reject(err);
                } else {
                  console.log('File copied to second directory');
                  resolve();
                }
              });
            })
            .on('error', (error) => {
              console.error('File writing error:', error);
              reject(error);
            });
        
          pdfDoc.end();
        });
  
        console.log(`File path: ${filePathlocal }`);
  
        res.header('Content-Type', 'application/pdf');
        res.header('Content-Disposition', `attachment; filename=${formattedDateTime}`);
       // res.download(filePath);
       // res.json(bl.id);
        res.sendFile(filePathlocal);
        

      //  await this.savePDF(filePathlocal, res, formattedDateTime);
      return bl.id
      } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Destinataire not found' });
    }
  }



 

  @Post(':idUser/createbl')
  async create(@Param('idUser', ParseIntPipe) idUser: number, @Body() createBlDto: CreateBlDto, @Res() res: Response) {
    try {
        const bl = await this.BlService.create(idUser, createBlDto);
        await this.generatePdf(bl.id, res);
        res.json(bl.id);
        return bl;
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating BL or generating PDF' });
    }
  }
  @Get(':id/file')
  async downloadFile(@Param('id') id: number, @Res() res: Response) {
    // Assume files are stored in a directory named 'downloads'
    const directoryPath = join(__dirname,'..','..' ,'Downloads');

    // Get the list of files in the directory
    const files = readdirSync(directoryPath);

    // Find the file that matches the given id in its name
    const filename = files.find((file) => file.startsWith(`${id}-`));

    if (!filename) {
      // If no matching file is found, send an error response
      return res.status(404).send('File not found');
    }

    // Construct the full file path
    const filePath = join(directoryPath, filename);

    // Set the headers for the response
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}`,
    });

    // Send the file as the response
    res.sendFile(filePath);
  }



  @Get(':id/downloadImported')
  async downloadFileFromExcel(@Param('id') id: number, @Res() res: Response){
     const bl= await this.BlService.findOneById(id);
    
    await this.generatePdf(bl.id,res);
    
    
    const directoryPath = join(__dirname,'..','..' ,'Downloads');
    const files = readdirSync(directoryPath);

    // Find the file that matches the given id in its name
    const filename = files.find((file) => file.startsWith(`${id}-`));

    if (!filename) {
      // If no matching file is found, send an error response
      return res.status(404).send('File not found');
    }

    // Construct the full file path
    const filePath = join(directoryPath, filename);

    // Set the headers for the response
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${filename}`,
    });

    // Send the file as the response
    res.sendFile(filePath);
    

  }

  @Get(':idUser/getAllBlByUser')
  async getBlByUserId(@Param('idUser') userId: number): Promise<Bl[]> {
    return await this.BlService.getBlByUserId(userId);
  }


  @Get(':idUser/getAllBlByUser/:page/:limit')
  async pagginate(@Param('idUser',new ParseIntPipe()) userId: number,
  @Param('page', ParseIntPipe) page: number,@Param('limit', ParseIntPipe) limit: number ,
): Promise<Bl[]> {
  const options: IPaginationOptions = {
    page,
    limit,
    route: `${userId}/getBLPagination`,
  };

  return this.BlService.paginate(userId, options);
}
  
    @Get(':idUser/:dest/getAllBlByDest/:page/:limit')
    async getBlByDest(@Param('idUser', ParseIntPipe) userId: number,
      @Param('dest') dest: string,
      @Param('page', ParseIntPipe) page: number,@Param('limit', ParseIntPipe) limit: number  ,
    ): Promise<Bl[]> {
      const options: IPaginationOptions = {
        page,
        limit: 10,
        route: `${userId}/${dest}/getAllBlByDest`,
      };

      return this.BlService.getBlByDestinataire(userId,dest, options);
    }

    @Get(':idUser/:date/byDate/:page/:limit')
    async getBlByDate(@Param('idUser', ParseIntPipe) userId: number,
      @Param('date') dateString: Date,
      @Param('page', ParseIntPipe) page: number,@Param('limit', ParseIntPipe) limit: number ,
    ): Promise<Bl[]> {
      
      const options: IPaginationOptions = {
        page,
        limit,
        route: `${userId}/${dateString}/byDate`, 
      };

  return this.BlService.getBlByDate(userId,dateString, options);
}


  @Get(':idUser/:name/getAllBlByName/:page/:limit')
  async getBlByName(@Param('idUser', ParseIntPipe) userId: number,
    @Param('name') name: string,
    @Param('page', ParseIntPipe) page: number,@Param('limit', ParseIntPipe) limit: number ,
  ): Promise<Bl[]> {
    const options: IPaginationOptions = {
      page,
      limit ,
      route: `${userId}/${name}/getAllBlByName`, 
    };

  return this.BlService.getBlByName(userId,name, options);
}

@Get(':idUser/getAllBlByUserFilter/:page/:limit')
async getBlByUserIdAndFiltrage(
  @Param('idUser', ParseIntPipe) userId: number,
  @Param('page', ParseIntPipe) page: number,@Param('limit', ParseIntPipe) limit: number,
  @Query('dateBl') dateBl?: Date,
  @Query('nomDest') nomDest?: string,
  @Query('blname') blname?: string, 
): Promise<Bl[]> {
  const options: ICustomPaginationOptions = {
    page,
    limit,
    route: `${userId}`,
    filters: {
      dateBl,
      nomDest,
      blname,
    },
  };

  return this.BlService.paginateFiltrage(userId, options);
}




}
function rgb(arg0: number, arg1: number, arg2: number) {
    throw new Error('Function not implemented.');
}

